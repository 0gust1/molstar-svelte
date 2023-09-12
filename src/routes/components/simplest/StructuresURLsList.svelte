<script lang="ts">
	export let structuresURLs: { url: string; type: string }[];
	export let selectedStructuresURLs: { url: string; type: string }[];
</script>

<ul class="inline-flex gap-1 list-none list-inside">
	{#each structuresURLs as structureURL, index (structureURL.url)}
		<li>
			<label>
				<input
					type="checkbox"
					name="structuresURLs"
					value={structureURL}
					bind:group={selectedStructuresURLs}
				/>

				{structureURL.url} - {structureURL.type}
			</label>
		</li>
	{/each}
</ul>
