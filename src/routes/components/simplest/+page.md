<script>
	import { browser} from '$app/environment';
	const loadModule = async () =>
		import('./WrapperRCSB.svelte').then((m) => {
			return m.default;
		});
	const pdbId = '1cbs';
</script>

# Simplest molstar-svelte component

## Empty wrapper (will show nothing)



## Wrapper with pdbId

{#if browser}
	{#await loadModule() then MolstarComp}
		<svelte:component this={MolstarComp} class="border h-18 bg-slate-300"/>
	{/await}
{/if}