<script lang="ts">
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { PluginContext } from 'molstar/lib/mol-plugin/context';
	const plugin = getContext<{ getPlugin: () => PluginContext }>('molstar').getPlugin();
	const highlightS = plugin.behaviors.labels.highlight;

	let clazz = '';
	export { clazz as class };
</script>

{#if $highlightS?.labels.length > 0}
	<div class="molstar-svelte-highlight-info ${clazz || ''}" transition:fade={{ duration: 100 }}>
		{#each $highlightS.labels as label}
			{@html label}
		{/each}
	</div>
{/if}

<style lang="postcss">
	.molstar-svelte-highlight-info {
		@apply absolute right-0 bottom-0 p-2 m-2 rounded bg-slate-400 border border-slate-500 text-white text-xs;
	}
</style>
