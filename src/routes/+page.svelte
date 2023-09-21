<script lang="ts">
	import type { SvelteComponentTyped } from 'svelte/internal';
	export let data;
	type C = $$Generic<typeof SvelteComponentTyped<any, any, any>>;
	$: component = data.content as unknown as C;
</script>

<svelte:component this={component} />
