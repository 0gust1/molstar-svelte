<script lang="ts">
	import { getContext } from 'svelte';
	import type { PluginContext } from 'molstar/lib/mol-plugin/context';
	import CollapsableDebugDetail from './CollapsableDebugDetail.svelte';
	import { SyncBehaviors } from 'molstar/lib/mol-plugin/behavior/static/state';
	import { Interactions } from 'molstar/lib/mol-plugin/behavior/dynamic/custom-props';

	const plugin = getContext<{ getPlugin: () => PluginContext }>('molstar').getPlugin();

	const closedS = plugin.events.canvas3d.settingsUpdated;
	const proS = plugin.events.task.progress;
	const finS = plugin.events.task.finished;
	const interClickS = plugin.behaviors.interaction.click;
	const interDragS = plugin.behaviors.interaction.drag;
	const molstarLogEventsS = plugin.events.log;
	const didDrawS = plugin.canvas3d?.didDraw;
	const reprCount = plugin.canvas3d?.reprCount;
	const stateChangedS = plugin.canvas3d?.camera.stateChanged;
	const highlightS = plugin.behaviors.labels.highlight;
	const dragS = plugin.behaviors.interaction.drag.asObservable();

	//const data1S = plugin.canvas3d?.camera.po

	export let panelOpen = true;

	let logs = plugin.log.entries;

	$: logs = molstarLogEventsS ? plugin.log.entries : '';
</script>

<section class="bg-slate-400 text-slate-100 bg-opacity-70 p-2">
	<p class="text-right">
		<button
			type="button"
			class="text-xs bg-slate-400 px-2 py-1 rounded border border-slate-500"
			on:click={() => {
				panelOpen = !panelOpen;
			}}>{panelOpen ? 'Hide' : 'Show'} debug panel</button
		>
	</p>
	<div class:open={panelOpen} class="hidden mt-2">
		<h1 class="font-medium">Molstar instance debug</h1>
		<button
			type="button"
			class="text-xs p-1 border border-slate-300"
			on:click={() => {
				console.dir(plugin);
			}}>Log in browser console</button
		>
		<CollapsableDebugDetail
			title="plugin.events.canvas3d.settingsUpdated"
			dataToDisplay={$closedS}
		/>

		<h2 class="font-medium">Logs</h2>

		<CollapsableDebugDetail title="logs" dataToDisplay={null}>
			<div class="max-h-screen overflow-y-auto">
				{#each [...logs] as log}
					<p>{log.type} - {log.message}</p>
				{/each}
			</div>
		</CollapsableDebugDetail>

		<h2 class="font-medium">plugin.events.task</h2>
		<CollapsableDebugDetail title="plugin.events.task.progress" dataToDisplay={$proS} />

		<CollapsableDebugDetail title="plugin.events.task.finished" dataToDisplay={$finS} />

		<h2 class="font-medium">Behavior</h2>
		<CollapsableDebugDetail title="Drag behav. modifiers" dataToDisplay={$interDragS.modifiers} />

		<CollapsableDebugDetail title="Click behav. modifiers" dataToDisplay={$interClickS.modifiers} />

		<CollapsableDebugDetail title="DidDraw" dataToDisplay={$didDrawS} />
		<CollapsableDebugDetail title="reprCount" dataToDisplay={$reprCount} />
		<CollapsableDebugDetail title="stateChanged" dataToDisplay={$stateChangedS} />
		<CollapsableDebugDetail title="highlights" dataToDisplay={$highlightS} />
		<CollapsableDebugDetail title="drag" dataToDisplay={$dragS} />
	</div>
</section>

<style lang="postcss">
	.open {
		@apply block;
	}
	pre {
		@apply border border-slate-700;
	}
</style>
