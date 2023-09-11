<script lang="ts">
	import { base } from '$app/paths';
</script>

<!-- <div class="flex h-16 shrink-0 items-center">
	<img
		class="h-8 w-auto"
		src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
		alt="Your Company"
	/>
</div> -->

<nav class="mt-8">
	<ul role="list">
		<ul role="list" class="sublist">
			<li><a href="{base}/">Home</a></li>
			<li><a href="{base}/library-design">Library Design / Contributing</a></li>
		</ul>
		<li>
			Components:
			<ul role="list" class="sublist">
				<li><a href="{base}/components/simplest">Simplest Molstar wrapper</a></li>
			</ul>
		</li>
	</ul>
</nav>

<style lang="postcss">
	nav {
		@apply flex flex-1 flex-col;
		@apply bg-gray-900 text-white;
		& > ul {
			@apply flex flex-1 flex-col gap-y-7;
		}
		& a {
			@apply text-gray-400 hover:text-white hover:bg-gray-800;
			@apply flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold;
		}
		& a.current {
			@apply bg-gray-800 text-white;
		}
		& .sublist {
			@apply -mx-2 space-y-1;
		}
	}
</style>
