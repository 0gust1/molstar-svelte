<script lang="ts">
	export let pdbIds: string[];
	export let selectedPdbIds: string[];
</script>

<ul class="inline-flex gap-1 list-none list-inside">
	{#each pdbIds as pdbId}
		<li>
			<label>
				<input type="checkbox" name="pdbIds" value={pdbId} bind:group={selectedPdbIds} />

				{pdbId}
			</label>
		</li>
	{/each}
</ul>
