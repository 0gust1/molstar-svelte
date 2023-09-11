<script lang="ts">
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
			<li><a href="/">Home</a></li>
			<li><a href="library-design">Library Design / Contributing</a></li>
		</ul>
		<li>
			Components:
			<ul role="list" class="sublist">
				<li><a href="">Simplest Molstar wrapper</a></li>
				<li><a href="">aaa</a></li>
				<li><a href="">vvv</a></li>
				<li><a href="">ccc</a></li>
				<li><a href="">vv</a></li>
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
