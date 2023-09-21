<script lang="ts">
	import { getContext } from 'svelte';

	import type { PluginContext } from 'molstar/lib/mol-plugin/context';
	const plugin = getContext<{ getPlugin: () => PluginContext }>('molstar').getPlugin();
	const highlightS = plugin.behaviors.labels.highlight;

	let clazz = '';
	export { clazz as class };
</script>

<!-- <ul>
	{#each plugin.log.entries as log}
		<li>{log.type} - {log.message}</li>
	{/each}
</ul>

<ul>
	{#each plugin.hierarchy.current.structures as structure}
		<li>{structure.label}</li>
	{/each}
</ul> -->

<style lang="postcss">
	.molstar-svelte-highlight-info {
	}
</style>
