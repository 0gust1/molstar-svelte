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
	import { dynamicSuperpositionTest } from './superposition-utils.ts';
	export let urlsAndChains: Array<{ url: string; type: BuiltInTrajectoryFormat; chainId: string }>;

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
	let structures: Awaited<ReturnType<typeof plugin.builders.structure.createStructure>>[] = [];

	const init = async () => {
		urlsAndChains.forEach(async (element) => {
			let data;
			data = await plugin.builders.data.download(
				{ url: element.url },
				{ state: { isGhost: false } }
			);
			const trajectory = await plugin.builders.structure.parseTrajectory(data, element.type);
			const model = await plugin.builders.structure.createModel(trajectory);
			const struct = await plugin.builders.structure.createStructure(model);

			//select the chain on the structure
			const chain = await plugin.builders.structure.tryCreateComponentFromExpression(
				struct,
				chainSelection(`${element.chainId}`),
				`Chain ${element.chainId}`
			);

			structures.push(struct);

			if (chain)
				await plugin.builders.structure.representation.addRepresentation(chain, {
					type: 'cartoon'
				});
		});
	};
	onMount(async () => {
		await init();
	});
	onDestroy(() => {
		structures.forEach((structure) => {
			plugin.commands.dispatch(PluginCommands.State.RemoveObject, {
				state: plugin.state.data,
				ref: structure.ref
			});
		});
	});
</script>
