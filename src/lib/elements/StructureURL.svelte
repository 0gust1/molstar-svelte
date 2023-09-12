<script lang="ts">
	import { getContext, onMount, onDestroy } from 'svelte';
	import type { PluginContext } from 'molstar/lib/mol-plugin/context.js';
	import { PluginCommands } from 'molstar/lib/mol-plugin/commands.js';
	import type { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory.js';

	export let url: string;
	export let type: BuiltInTrajectoryFormat;

	type Preset =
		| 'auto'
		| 'empty'
		| 'illustrative'
		| 'atomic-detail'
		| 'polymer-cartoon'
		| 'polymer-and-ligand'
		| 'protein-and-nucleic'
		| 'coarse-surface'
		| undefined;

	const plugin = getContext<{ getPlugin: () => PluginContext }>('molstar').getPlugin();
	let structure: Awaited<ReturnType<typeof plugin.builders.structure.createStructure>>;
	const init = async () => {
		let data;
		data = await plugin.builders.data.download({ url: url }, { state: { isGhost: false } });
		const trajectory = await plugin.builders.structure.parseTrajectory(data, type);
		const model = await plugin.builders.structure.createModel(trajectory);
		const struct = await plugin.builders.structure.createStructure(model);
		structure = struct;
		await plugin.builders.structure.hierarchy.applyPreset(structure, 'default');
	};
	onMount(() => {
		init();
	});
	onDestroy(() => {
		plugin.commands.dispatch(PluginCommands.State.RemoveObject, {
			state: plugin.state.data,
			ref: structure.ref
		});
	});
</script>
