<script lang="ts">
	// replace "$lib/" with "molstar-svelte/" in your project:
	import StructureRCSB from '$lib/elements/StructureRCSB.svelte';
	import MolstarWrapper from '$lib/wrappers/SimpleWrapper.svelte';
	import PDBIdsList from './PDBIdsList.svelte';
	export let pdbIds = ['7D4B', '5WJF', '5WIW', '6A3W'];
	let selectedPdbIds = [...pdbIds];
</script>

<p class="text-xs">
	Selected: <span class="text-violet-500">{selectedPdbIds.join(', ')}</span>
</p>
<MolstarWrapper class="h-96">
	<svelte:fragment slot="elements">
		{#each selectedPdbIds as pdbId (pdbId)}
			<StructureRCSB {pdbId} />
		{/each}
	</svelte:fragment>
</MolstarWrapper>
{#if pdbIds.length > 1}
	<PDBIdsList {pdbIds} bind:selectedPdbIds />
{/if}
