<script lang="ts">
	/**
	 * Load a structure from an URL
	 * @param url URL to load the structure from
	 * @param type Type of the structure
	 */

	import { getContext, onMount, onDestroy } from 'svelte';
	import { PluginContext } from 'molstar/lib/mol-plugin/context.js';
	import { PluginCommands } from 'molstar/lib/mol-plugin/commands.js';
	import { DownloadStructure } from 'molstar/lib/mol-plugin-state/actions/structure.js';
	import { QualityAssessmentPLDDTPreset } from 'molstar/lib/extensions/model-archive/quality-assessment/behavior.js';
	import type { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory.js';
	import { StructureRepresentationPresetProvider } from 'molstar/lib/mol-plugin-state/builder/structure/representation-preset.js';
	import { PluginConfig } from 'molstar/lib/mol-plugin/config.js';

	export let url: string;
	export let type: BuiltInTrajectoryFormat;
	export let alphaDBId: string;
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

	// FIXME: move this at molstar wrapper level.
	// when unmounting + mounting again, molstar understably complains about the preset already being registred.
	plugin.builders.structure.representation.registerPreset(QualityAssessmentPLDDTPreset);

	const init = async () => {
		let data;

		const params = DownloadStructure.createDefaultParams(plugin.state.data.root.obj!, plugin);

		data = await plugin.builders.data.download({ url: url }, { state: { isGhost: false } });
		const trajectory = await plugin.builders.structure.parseTrajectory(data, type);
		const model = await plugin.builders.structure.createModel(trajectory);
		const struct = await plugin.builders.structure.createStructure(model);
		structure = struct;

		console.log('structure', structure);

		await plugin.builders.structure.hierarchy.applyPreset(
			trajectory,
			'preset-structure-representation-ma-quality-assessment-plddt',
			params
		);
		//await plugin.builders.structure.hierarchy.applyPreset(model, 'default', params);

		//const model = await plugin.builders.structure.createModel(trajectory);
		//const params = StructureRepresentationPresetProvider.CommonParams;
		//await QualityAssessmentPLDDTPreset.apply(model.ref, params, plugin);
		//const struct = await plugin.builders.structure.createStructure(model);
		//structure = struct;

		//await plugin.managers.structure.component.updateRepresentationsTheme();

		//await plugin.builders.structure.hierarchy.applyPreset(structure, 'default', params);
		//await plugin.builders.structure.hierarchy.applyPreset(structure, 'default');
		//QualityAssessmentPLDDTPreset.apply(structure, params, plugin);
		// await plugin.managers.structure.component.applyPreset(
		// 	structure,
		// 	QualityAssessmentPLDDTPreset,
		// 	params
		// );

		// const params = DownloadStructure.createDefaultParams(plugin.state.data.root.obj!, plugin);
		//  await plugin.runTask(
		// 	plugin.state.data.applyAction(DownloadStructure, {
		// 		source: {
		// 			name: 'alphafolddb' as const,
		// 			params: {
		// 				id: alphaDBId,
		// 				options: {
		// 					...params.source.params.options,
		// 					representation: 'preset-structure-representation-ma-quality-assessment-plddt'
		// 				}
		// 			}
		// 		}
		// 	})
		// );

		return;
		//return;
	};
	onMount(async () => {
		await init();
	});
	onDestroy(() => {
		plugin.commands.dispatch(PluginCommands.State.RemoveObject, {
			state: plugin.state.data,
			ref: structure.ref
		});
	});
</script>
