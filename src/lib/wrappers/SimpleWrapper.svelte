<script lang="ts">
	import { DefaultPluginSpec, PluginSpec } from 'molstar/lib/mol-plugin/spec.js';
	import { PluginContext } from 'molstar/lib/mol-plugin/context.js';
	import { PluginCommands } from 'molstar/lib/mol-plugin/commands.js';
	import { PluginConfig } from 'molstar/lib/mol-plugin/config.js';
	import { Color } from 'molstar/lib/mol-util/color';
	import { onDestroy, onMount, setContext, createEventDispatcher } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { BROWSER } from 'esm-env';

	let clazz = '';
	export { clazz as class };
	export let didDrawStore: Writable<{ value: number; instanceId: string }> | null = null;

	export let plugin: PluginContext | null = null; // used for binding
	let randArray = new Uint8Array(1);
	export let uid = crypto.getRandomValues(randArray)[0];
	let renderer = null;
	let initcomplete = false;

	let molstarContainerEl: HTMLDivElement;
	let molstarCanvasEl: HTMLCanvasElement;

	let pluginDidDrawObservable;

	const dispatch = createEventDispatcher();

	const MySpec: PluginSpec = {
		...DefaultPluginSpec(),
		config: [[PluginConfig.VolumeStreaming.Enabled, false]],
		canvas3d: {
			postprocessing: {
				occlusion: {
					name: 'on',
					params: {
						samples: 32,
						radius: 6,
						bias: 1.4,
						multiScale: { name: 'off', params: {} },
						blurKernelSize: 15,
						resolutionScale: 1
					}
				},
				outline: { name: 'on', params: { scale: 1, threshold: 0.99, color: Color(0x000000) } }
			},
			renderer: {
				ambientIntensity: 1.0,
				light: [
					//{ color: Color(0xffffff), azimuth: 1.0, inclination: 180, intensity: 1.0 }
				],
				backgroundColor: 0x001f42 as Color
			}
		}
		//config:[[PluginConfig.Structure.DefaultRepresentationPreset, ViewerAutoPreset.id],]
	};

	plugin = new PluginContext(MySpec);

	setContext('molstar', { getPlugin: () => plugin });

	async function init() {
		if (!BROWSER) return;
		if (!plugin) return;
		await plugin.init();

		if (!plugin.initViewer(molstarCanvasEl, molstarContainerEl)) {
			console.error('Failed to init Mol*');
			return;
		}

		renderer = plugin.canvas3d!.props.renderer;
		if (didDrawStore) {
			pluginDidDrawObservable = plugin?.behaviors.interaction.drag.asObservable(); //plugin?.canvas3d?.didDraw;
		}
		await PluginCommands.Canvas3D.SetSettings(plugin, {
			settings: {
				/* renderer: {
					...renderer,
					ambientIntensity: 1.0,
					light: [],
					backgroundColor: 0x001f42 as Color
				}, */
				cameraResetDurationMs: 100,
				trackball: {
					noScroll: true
				},
				postprocessing: {
					occlusion: {
						name: 'on',
						params: {
							multiScale: { name: 'off', params: {} },
							samples: 32,
							radius: 6,
							bias: 1.4,
							blurKernelSize: 15,
							resolutionScale: 1
						}
					},
					outline: { name: 'on', params: { scale: 1, threshold: 0.33, color: Color(0x000000) } }
				}
			}
		});

		/* await PluginCommands.State.Update(plugin,{
			options:{

			}
		}) */

		dispatch('molstarPluginInit', { uid: uid });
	}

	onMount(async () => {
		if (!BROWSER) return;
		await init();
		initcomplete = true;

		//console.log('plugin');
		//console.dir(plugin);
	});

	onDestroy(async () => {
		if (initcomplete) {
			await plugin?.clear();
			await plugin?.dispose();
		}
	});

	$: {
		if (didDrawStore && $pluginDidDrawObservable) {
			//didDrawStore.update((v)=>$pluginDidDrawObservable);
			didDrawStore.set({ value: plugin?.canvas3d?.camera.getSnapshot(), instanceId: uid });
		}
	}
</script>

<div class="molstar_wrapper">
	<div class={`plugin_container ${clazz || ''}`}>
		<div
			bind:this={molstarContainerEl}
			style="position: absolute; top: 0; left: 0; right: 0; bottom: 0"
		>
			<canvas bind:this={molstarCanvasEl} />
			{#if BROWSER && initcomplete}
				<slot name="content" />
			{/if}
		</div>
	</div>
	{#if BROWSER && initcomplete}
		<slot name="controls" />
	{/if}
</div>

<style>
	.plugin_container {
		position: relative;
		width: 100%;
	}
</style>
