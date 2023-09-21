<script lang="ts">
	import { browser} from '$app/environment';


	const loadComponentDemoWithControls = async () =>
		import('./DemoControls.svelte').then((m) => {
			return m.default;
		});

		const loadComponentDemoWithControls2 = async () =>
		import('./DemoControls2.svelte').then((m) => {
			return m.default;
		});

</script>

# SimpleWrapper + controls

## Highlight info + ButtonBar

{#if browser}
	{#await loadComponentDemoWithControls() then MolstarComp}
	<div class="not-prose">
		<svelte:component this={MolstarComp} />
	</div>
	{/await}
{/if}

## Highlight info + ButtonBar variant

{#if browser}
	{#await loadComponentDemoWithControls2() then MolstarComp}
	<div class="not-prose">
		<svelte:component this={MolstarComp} />
	</div>
	{/await}
{/if}
