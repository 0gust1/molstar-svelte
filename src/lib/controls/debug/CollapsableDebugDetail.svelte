<script lang="ts">
	export let title: string;
	export let dataToDisplay: any;
	export let isOpen = false;
</script>

<details class="text-xs my-2" bind:open={isOpen}>
	<summary class="font-medium">{title}</summary>

	<div class=" text-green-200 bg-slate-500 bg-opacity-60 p-2">
		{#if isOpen}
			<slot>
				<pre>
{JSON.stringify(dataToDisplay, null, 2)}
</pre>
			</slot>
		{/if}
	</div>
</details>

<style lang="postcss">
	details summary {
		@apply cursor-pointer;
	}
	details summary:hover {
		@apply bg-orange-500 bg-opacity-20;
	}
</style>
