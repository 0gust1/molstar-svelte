<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type { PluginContext } from 'molstar/lib/mol-plugin/context.js';

	export let url: string;
	export let type: `mmcif` | `pdb`;
	const plugin = getContext<{ getPlugin: () => PluginContext }>('molstar').getPlugin();

	const init = async () => {
		let data;
		data = await plugin.builders.data.download({ url: url }, { state: { isGhost: false } });
		const trajectory = await plugin.builders.structure.parseTrajectory(data, type);
		const model = await plugin.builders.structure.createModel(trajectory);
		const structure = await plugin.builders.structure.createStructure(model);

		await plugin.builders.structure.hierarchy.applyPreset(structure, 'default');
	};
	onMount(() => {
		init();
	});
</script>
