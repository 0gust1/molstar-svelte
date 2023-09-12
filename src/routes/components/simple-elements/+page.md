<script lang="ts">
	import { browser} from '$app/environment';
	import wrapperRCSBRaw from './WrapperRCSB.svelte?raw';
	import wrapperURLRaw from './WrapperURL.svelte?raw';

	const loadComponentWrapperWithPDB = async () =>
		import('./WrapperRCSB.svelte').then((m) => {
			return m.default;
		});

		const loadComponentWrapperWithURLs = async () =>
		import('./WrapperURL.svelte').then((m) => {
			return m.default;
		});

		const pdbId1 = '1xkk'
		const url1 = {url: 'https://alphafold.ebi.ac.uk/files/AF-Q07011-F1-model_v4.cif', type: 'mmcif'}
		const pdbList2 = ['7D4B', '5WJF', '5WIW', '6A3W']
		const urlList2 = [
		{ url: 'https://files.rcsb.org/view/7U4A.pdb', type: 'pdb' },
		{ url: 'https://files.rcsb.org/view/7YLB.pdb', type: 'pdb' },
		{ url: 'https://files.rcsb.org/view/7YUB.cif', type: 'mmcif' },
		{ url: 'https://alphafold.ebi.ac.uk/files/AF-P00533-F1-model_v4.cif', type: 'mmcif' }
	]

</script>

# SimpleWrapper + elements



## Empty wrapper (will show nothing)



## Wrapper with `StructureRCSB.svelte`

<pre class="text-sm">
{wrapperRCSBRaw}
</pre>



### PdbID, with one instance

{#if browser}
	{#await loadComponentWrapperWithPDB() then MolstarComp}
		<svelte:component this={MolstarComp} pdbIds={[pdbId1]} class="border h-18 w-1/2 bg-slate-300"/>
	{/await}
{/if}

### PdbID, with several instances (reactive)

{#if browser}
	{#await loadComponentWrapperWithPDB() then MolstarComp}
		<svelte:component this={MolstarComp} pdbIds={pdbList2} class="border h-18 bg-slate-300"/>
	{/await}
{/if}

## Wrapper with `StructureURL.svelte`

<pre class="text-sm">
{wrapperURLRaw}
</pre>

### URL, with one instance

{#if browser}
	{#await loadComponentWrapperWithURLs() then MolstarComp}
		<svelte:component this={MolstarComp} structuresURLs={[url1]} class="border h-18 bg-slate-300"/>
	{/await}
{/if}

### URL, with several instances (reactive)
(todo: fix this, some problems with the reactive part/each keyed loop)
{#if browser}
	{#await loadComponentWrapperWithURLs() then MolstarComp}
		<svelte:component this={MolstarComp} structuresURLs={urlList2} class="border h-18 bg-slate-300"/>
	{/await}
{/if}