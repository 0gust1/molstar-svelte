<script lang="ts">
	import '../app.css';
	import { fade, slide } from 'svelte/transition';
	import Menu from './Menu.svelte';
	import AppHeader from './AppHeader.svelte';
	let mobileSideBarOpen = false;
</script>

<!-- <Menu />

<slot /> -->

<div>
	<!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
	<div class="relative z-50 lg:hidden" role="dialog" aria-modal="true">
		{#if mobileSideBarOpen}
			<!-- Off-canvas menu backdrop -->
			<div class="fixed inset-0 bg-gray-900/80" transition:fade={{ duration: 300 }} />

			<div class="fixed inset-0 flex">
				<!--Off-canvas menu, show/hide based on off-canvas menu state.
  
          Entering: "transition ease-in-out duration-300 transform"
            From: "-translate-x-full"
            To: "translate-x-0"
          Leaving: "transition ease-in-out duration-300 transform"
            From: "translate-x-0"
            To: "-translate-x-full"
        -->
				<div
					class="relative mr-16 flex w-full max-w-xs flex-1"
					transition:slide={{ axis: 'x', duration: 300 }}
				>
					<!--
            Close button, show/hide based on off-canvas menu state.
  
            Entering: "ease-in-out duration-300"
              From: "opacity-0"
              To: "opacity-100"
            Leaving: "ease-in-out duration-300"
              From: "opacity-100"
              To: "opacity-0"
          -->
					<div class="absolute left-full top-0 flex w-16 justify-center pt-5">
						<button
							type="button"
							class="-m-2.5 p-2.5"
							on:click={() => {
								mobileSideBarOpen = false;
							}}
						>
							<span class="sr-only">Close sidebar</span>
							<svg
								class="h-6 w-6 text-white"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>

					<!-- Sidebar component, swap this element with another sidebar if you like -->
					<div
						class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10"
					>
						<Menu />
					</div>
				</div>
			</div>
		{/if}
	</div>

	<!-- Static sidebar for desktop -->
	<div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
		<!-- Sidebar component, swap this element with another sidebar if you like -->
		<div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
			<Menu />
		</div>
	</div>

	<div class="lg:pl-72">
		<div
			class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
		>
			<button
				type="button"
				class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
				on:click={() => {
					mobileSideBarOpen = true;
				}}
			>
				<span class="sr-only">Open sidebar</span>
				<svg
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			</button>

			<!-- Separator -->
			<div class="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

			<AppHeader />
		</div>

		<main class="py-10">
			<article class="doc-content prose prose-zinc">
				<slot />
			</article>
		</main>
	</div>
</div>

<style lang="postcss">
	/* .mobile-sidebar_backdrop {
	}
	.mobile-sidebar_backdrop--open {
	}
	.mobile-sidebar_backdrop--closed {
	}
	.mobile-sidebar_content {
	}
	.mobile-sidebar_content--open {
	}
	.mobile-sidebar_content--closed {
	} */
	.doc-content {
		@apply px-4 sm:px-6 lg:px-8;
	}
</style>
