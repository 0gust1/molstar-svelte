<script lang="ts">
	// replace "$lib/" with "molstar-svelte/" in your project:
	import Superposition from '$lib/elements/Superposition.svelte';
	import MolstarWrapper from '$lib/wrappers/SimpleWrapper.svelte';
	import StructuresURLsList from './StructuresURLsList.svelte';
	export let structuresURLs = [
		{ url: 'https://files.rcsb.org/view/7U4A.pdb', type: 'pdb', chainId: 'A' },
		{ url: 'https://files.rcsb.org/view/7YLB.pdb', type: 'pdb', chainId: 'A' },
		{ url: 'https://files.rcsb.org/view/7YUB.cif', type: 'mmcif', chainId: 'A' },
		{
			url: 'https://alphafold.ebi.ac.uk/files/AF-P00533-F1-model_v4.cif',
			type: 'mmcif',
			chainId: 'A'
		}
	];
	let selectedStructuresURLs = [...structuresURLs];
</script>

<p class="text-xs">
	Selected: <span class="text-violet-500"
		>{selectedStructuresURLs.map((e) => e.url).join(', ')}</span
	>
</p>
<MolstarWrapper class="h-96">
	<svelte:fragment slot="elements">
		<Superposition urlsAndChains={structuresURLs} />
	</svelte:fragment>
</MolstarWrapper>
{#if structuresURLs.length > 1}
	<StructuresURLsList {structuresURLs} bind:selectedStructuresURLs />
{/if}
