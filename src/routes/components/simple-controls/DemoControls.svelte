<script lang="ts">
	import StructureURL from '$lib/elements/StructureURL.svelte';
	import HighlightInfo from '$lib/controls/HighlightInfo.svelte';
	import MolstarWrapper from '$lib/wrappers/SimpleWrapper.svelte';
	import ButtonBar from '$lib/controls/ButtonBar.svelte';
	export let structuresURLs = [
		{ url: 'https://files.rcsb.org/view/7YUB.cif', type: 'mmcif' },
		{ url: 'https://alphafold.ebi.ac.uk/files/AF-P00533-F1-model_v4.cif', type: 'mmcif' }
	];
	let selectedStructuresURLs = [...structuresURLs];
</script>

<MolstarWrapper class="" pluginCssClasses="h-96 w-full">
	<svelte:fragment slot="inside">
		{#each selectedStructuresURLs as structureURL (`${structureURL.url}-${structureURL.type}`)}
			<StructureURL url={structureURL.url} type={structureURL.type} />
		{/each}
		<HighlightInfo />
	</svelte:fragment>
	<svelte:fragment slot="outside">
		<ButtonBar />
		<div>
			Displaying:
			{#each selectedStructuresURLs as structureURL (`${structureURL.url}-${structureURL.type}`)}
				<p class="text-xs"><span>{structureURL.url}</span> <span>({structureURL.type})</span></p>
			{/each}
		</div>
	</svelte:fragment>
</MolstarWrapper>
