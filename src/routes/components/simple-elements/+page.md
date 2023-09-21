<script lang="ts">
	import { browser} from '$app/environment';
	import demoRCSBRaw from './DemoRCSB.svelte?raw';
	import demoURLRaw from './DemoURL.svelte?raw';

	const loadComponentDemoWithPDB = async () =>
		import('./DemoRCSB.svelte').then((m) => {
			return m.default;
		});

		const loadComponentDemoWithURLs = async () =>
		import('./DemoURL.svelte').then((m) => {
			return m.default;
		});

		const loadComponentDemoWithURLChains = async () =>
		import('./DemoURLChain.svelte').then((m) => {
			return m.default;
		});

		const pdbId1 = '6a3v'
		const url1 = {url: 'https://alphafold.ebi.ac.uk/files/AF-Q07011-F1-model_v4.cif', type: 'mmcif'}
		const pdbList2 = ['7D4B', '5WJF', '5WIW', '6A3W']
		const urlList2 = [
		{ url: 'https://files.rcsb.org/view/7U4A.pdb', type: 'pdb' },
		{ url: 'https://files.rcsb.org/view/7YLB.pdb', type: 'pdb' },
		{ url: 'https://files.rcsb.org/view/7YUB.cif', type: 'mmcif' },
		{ url: 'https://alphafold.ebi.ac.uk/files/AF-P00533-F1-model_v4.cif', type: 'mmcif' }
	]

	const urlChain1 = {url:'https://files.rcsb.org/view/6A3V.cif', type:'mmcif', chainId:'B'};
	const urlChainList = [
		{url:'https://files.rcsb.org/view/6A3V.cif', type:'mmcif', chainId:'B'},
		{url:'https://files.rcsb.org/view/6A3W.cif', type:'mmcif', chainId:'C'},
		{url:'https://files.rcsb.org/view/6BWV.cif', type:'mmcif', chainId:'C'},
		{url:'https://files.rcsb.org/view/6CPR.cif', type:'mmcif', chainId:'F'},
	];

</script>

# SimpleWrapper + elements



## Empty wrapper (will show nothing)



## Wrapper with `StructureRCSB.svelte`

<pre class="text-sm">
{demoRCSBRaw}
</pre>



### PdbID, with one instance

{#if browser}
	{#await loadComponentDemoWithPDB() then MolstarComp}
	<div class="not-prose">
		<svelte:component this={MolstarComp} pdbIds={[pdbId1]} class="border h-18 w-1/2 bg-slate-300"/>
	</div>
	{/await}
{/if}

### PdbID, with several instances (reactive)

{#if browser}
	{#await loadComponentDemoWithPDB() then MolstarComp}
	<div class="not-prose">
		<svelte:component this={MolstarComp} pdbIds={pdbList2} class="border h-18 bg-slate-300"/>
	</div>
	{/await}
{/if}

## Wrapper with `StructureURL.svelte`

<pre class="text-sm">
{demoURLRaw}
</pre>

### URL, with one instance

{#if browser}
{#await loadComponentDemoWithURLs() then MolstarComp}
<div class="not-prose">
<svelte:component this={MolstarComp} structuresURLs={[url1]} class="border h-18 bg-slate-300"/>
</div>
{/await}
{/if}

### URL, with several instances (reactive)

(todo: fix this, some problems with the reactive part/each keyed loop)

{#if browser}
{#await loadComponentDemoWithURLs() then MolstarComp}
<div class="not-prose">
<svelte:component this={MolstarComp} structuresURLs={urlList2} class="border h-18 bg-slate-300"/>
</div>
{/await}
{/if}

### URLChain one instance

{#if browser}
	{#await loadComponentDemoWithURLChains() then MolstarComp}
	<div class="not-prose">
		<svelte:component this={MolstarComp} structuresURLs={[urlChain1]} class="border h-18 bg-slate-300"/>
	</div>
	{/await}
{/if}

### URLChain several instances

(Q07011 structures)

{#if browser}
	{#await loadComponentDemoWithURLChains() then MolstarComp}
	<div class="not-prose">
		<svelte:component this={MolstarComp} structuresURLs={urlChainList} class="border h-18 bg-slate-300"/>
	</div>
	{/await}
{/if}