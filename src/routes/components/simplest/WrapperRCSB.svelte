<script lang="ts">
	import StructureRCSB from '$lib/elements/StructureRCSB.svelte';
	import MolstarWrapper from '$lib/wrappers/SimpleWrapper.svelte';
	const pdbIds = ['7D4B'];
</script>

<MolstarWrapper class="h-96">
	<svelte:fragment slot="content">
		{#each pdbIds as pdbId}
			<StructureRCSB {pdbId} />
		{/each}
	</svelte:fragment>
</MolstarWrapper>
