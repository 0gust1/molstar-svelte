<script lang="ts">
	import { browser} from '$app/environment';


	const loadComponentDemoWithControls = async () =>
		import('./DemoControls.svelte').then((m) => {
			return m.default;
		});

</script>

# SimpleWrapper + controls

## Highlight info

{#if browser}
	{#await loadComponentDemoWithControls() then MolstarComp}
		<svelte:component this={MolstarComp} />
	{/await}
{/if}
