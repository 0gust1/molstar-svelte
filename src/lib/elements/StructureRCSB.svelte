<script lang="ts">
	import StructureURL from '$lib/elements/StructureURL.svelte';
	export let pdbId: string;
	const url = `https://www.ebi.ac.uk/pdbe/static/entry/${pdbId.toLocaleLowerCase()}_updated.cif`;
</script>

<StructureURL {url} type="mmcif" />
