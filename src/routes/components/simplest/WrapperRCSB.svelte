<script lang="ts">
	import StructureRCSB from '$lib/elements/StructureRCSB.svelte';
	import MolstarWrapper from '$lib/wrappers/SimpleWrapper.svelte';
	import PDBIdsList from './PDBIdsList.svelte';
	export let pdbIds = ['7D4B', '5WJF', '5WIW', '6A3W'];
	let selectedPdbIds = [...pdbIds];
</script>

Selected: {selectedPdbIds.join(', ')}
<MolstarWrapper class="h-96">
	<svelte:fragment slot="content">
		{#each selectedPdbIds as pdbId (pdbId)}
			<StructureRCSB {pdbId} />
		{/each}
	</svelte:fragment>
</MolstarWrapper>

<PDBIdsList {pdbIds} bind:selectedPdbIds />
