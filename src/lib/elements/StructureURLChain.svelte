<script lang="ts">
	/**
	 * Load a structure from an URL
	 * @param url URL to load the structure from
	 * @param type Type of the structure
	 * @param chainId Chain ID to select
	 */
	import { getContext, onMount, onDestroy } from 'svelte';
	import type { PluginContext } from 'molstar/lib/mol-plugin/context.js';
	import { PluginCommands } from 'molstar/lib/mol-plugin/commands.js';
	import { MolScriptBuilder as MS } from 'molstar/lib/mol-script/language/builder.js';
	import type { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory.js';

	export let url: string;
	export let type: BuiltInTrajectoryFormat;
	export let chainId: string;

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

	function chainSelection(auth_asym_id: string) {
		return MS.struct.generator.atomGroups({
			'chain-test': MS.core.rel.eq([
				MS.struct.atomProperty.macromolecular.auth_asym_id(),
				auth_asym_id
			])
		});
	}
	let structure: Awaited<ReturnType<typeof plugin.builders.structure.createStructure>>;
	const init = async () => {
		let data;
		data = await plugin.builders.data.download({ url: url }, { state: { isGhost: false } });
		const trajectory = await plugin.builders.structure.parseTrajectory(data, type);
		const model = await plugin.builders.structure.createModel(trajectory);
		const struct = await plugin.builders.structure.createStructure(model);
		structure = struct;

		//select the chain on the structure
		const chain = await plugin.builders.structure.tryCreateComponentFromExpression(
			structure,
			chainSelection(`${chainId}`),
			`Chain ${chainId}`
		);
		//center the structure

		if (chain)
			await plugin.builders.structure.representation.addRepresentation(chain, { type: 'cartoon' });

		//let ass = await StructureSymmetry.buildAssembly(model, structure);
		//await plugin.builders.structure.hierarchy.applyPreset(structure, 'default');
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
