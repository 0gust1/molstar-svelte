<script lang="ts">
	import StructureURL from '$lib/elements/StructureURL.svelte';
	import MolstarWrapper from '$lib/wrappers/SimpleWrapper.svelte';
	import StructuresURLsList from './StructuresURLsList.svelte';
	export let structuresURLs = [
		{ url: 'https://files.rcsb.org/view/7U4A.pdb', type: 'pdb' },
		{ url: 'https://files.rcsb.org/view/7YLB.pdb', type: 'pdb' },
		{ url: 'https://files.rcsb.org/view/7YUB.cif', type: 'mmcif' }
	];
	let selectedStructuresURLs = [...structuresURLs];
</script>

Selected: {selectedStructuresURLs.map((e) => e.url).join(', ')}
<MolstarWrapper class="h-96">
	<svelte:fragment slot="content">
		{#each selectedStructuresURLs as structureURL (`${structureURL.url}-${structureURL.type}`)}
			<StructureURL url={structureURL.url} type={structureURL.type} />
		{/each}
	</svelte:fragment>
</MolstarWrapper>

<StructuresURLsList {structuresURLs} bind:selectedStructuresURLs />
