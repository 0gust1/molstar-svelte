<script lang="ts">
	export let structuresURLs: { url: string; type: string }[];
	export let selectedStructuresURLs: { url: string; type: string }[];
</script>

<ul class="inline-flex gap-1 list-none list-inside pl-0 text-xs">
	{#each structuresURLs as structureURL, index (structureURL.url)}
		<li>
			<label class="flex flex-col my-0">
				<input
					type="checkbox"
					name="structuresURLs"
					value={structureURL}
					bind:group={selectedStructuresURLs}
				/>
				<span>
					{structureURL.url} - {structureURL.type}
				</span>
			</label>
		</li>
	{/each}
</ul>
