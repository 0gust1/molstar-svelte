<script lang="ts">
	import StructureURL from '$lib/elements/StructureURL.svelte';
	import StructureAlphaFold from '$lib/elements/StructureAlphaFold.svelte';
	import HighlightInfo from '$lib/controls/HighlightInfo.svelte';
	import DebugPanel from '$lib/controls/debug/DebugPanel.svelte';
	import Scene from '$lib/controls/Scene.svelte';
	import MolstarWrapper from '$lib/wrappers/SimpleWrapper.svelte';
	import ButtonBar from '$lib/controls/ButtonBar.svelte';
	export let structuresURLs = [
		{ url: 'https://alphafold.ebi.ac.uk/files/AF-Q8W3K0-F1-model_v4.cif', type: 'mmcif' }
	];
	let selectedStructuresURLs = [...structuresURLs];
</script>

<div>
	<MolstarWrapper pluginCssClasses="h-96 w-full" class="flex">
		<svelte:fragment slot="inside">
			<StructureAlphaFold
				url={selectedStructuresURLs[0].url}
				type={selectedStructuresURLs[0].type}
			/>

			<HighlightInfo />
		</svelte:fragment>
		<div slot="outside" class="flex flex-col">
			<ButtonBar class="flex flex-col bg-red-500" />
			<DebugPanel panelOpen={false} />
			<Scene />
			<div>
				Displaying:
				{#each selectedStructuresURLs as structureURL (`${structureURL.url}-${structureURL.type}`)}
					<p class="text-xs"><span>{structureURL.url}</span> <span>({structureURL.type})</span></p>
				{/each}
			</div>
		</div>
	</MolstarWrapper>
</div>
