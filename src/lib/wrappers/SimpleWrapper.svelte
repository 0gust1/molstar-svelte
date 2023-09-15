<script lang="ts">
	import { BROWSER } from 'esm-env';
	import type { Writable } from 'svelte/store';
	import { onDestroy, onMount, setContext, createEventDispatcher } from 'svelte';
	import { DefaultPluginSpec, PluginSpec } from 'molstar/lib/mol-plugin/spec.js';
	import { PluginContext } from 'molstar/lib/mol-plugin/context.js';
	import { PluginCommands } from 'molstar/lib/mol-plugin/commands.js';
	import { defaultPluginSpec, defaultCanvas3dSettings } from './simplewrapper-utils.js';

	let clazz = '';
	let randArray = new Uint8Array(1);

	export { clazz as class };
	export let didDrawStore: Writable<{ value: number; instanceId: string }> | null = null;
	export let plugin: PluginContext | null = null; // used for binding
	export let uid = crypto.getRandomValues(randArray)[0];
	export let pluginSpecs: Partial<PluginSpec> = defaultPluginSpec;

	let initcomplete = false;

	let molstarContainerEl: HTMLDivElement;
	let molstarCanvasEl: HTMLCanvasElement;

	let pluginDidDrawObservable;

	const dispatch = createEventDispatcher();

	const MySpec: PluginSpec = {
		...DefaultPluginSpec(),
		...pluginSpecs
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

		//renderer = plugin.canvas3d!.props.renderer;
		if (didDrawStore) {
			pluginDidDrawObservable = plugin?.behaviors.interaction.drag.asObservable(); //plugin?.canvas3d?.didDraw;
		}
		await PluginCommands.Canvas3D.SetSettings(plugin, defaultCanvas3dSettings);

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
	});

	onDestroy(async () => {
		if (initcomplete) {
			await plugin?.clear();
			plugin?.dispose();
		}
	});

	$: {
		if (didDrawStore && $pluginDidDrawObservable) {
			//didDrawStore.update((v)=>$pluginDidDrawObservable);
			didDrawStore.set({ value: plugin?.canvas3d?.camera.getSnapshot(), instanceId: uid });
		}
	}
</script>

<div class="molstar-svelte_wrapper">
	<div class={`plugin_container ${clazz || ''}`}>
		<div
			bind:this={molstarContainerEl}
			style="position: absolute; top: 0; left: 0; right: 0; bottom: 0"
		>
			<canvas bind:this={molstarCanvasEl} />
			{#if BROWSER && initcomplete}
				<slot name="inside" />
			{/if}
		</div>
	</div>
	{#if BROWSER && initcomplete}
		<slot name="outside" />
	{/if}
</div>

<style>
	.plugin_container {
		position: relative;
	}
</style>
