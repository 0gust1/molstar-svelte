<script lang="ts">
	/**
	 * Component to display a button bar giving some action over a Molstar plugin instance.
	 */

	import { getContext } from 'svelte';
	import { PluginCommands } from 'molstar/lib/mol-plugin/commands';
	import type { PluginContext } from 'molstar/lib/mol-plugin/context';
	import { ViewportScreenshotHelper } from 'molstar/lib/mol-plugin/util/viewport-screenshot';

	export { clazz as class };
	let clazz = '';
	const plugin = getContext<{ getPlugin: () => PluginContext }>('molstar').getPlugin();

	const resetCamera = () => {
		PluginCommands.Camera.Reset(plugin);
	};

	const screenshotToClipBoard = () => {
		const vpsh = new ViewportScreenshotHelper(plugin);
		vpsh.copyToClipboard();
	};

	const screenshotDownload = () => {
		const vpsh = new ViewportScreenshotHelper(plugin);
		vpsh.download('screenshot.png');
	};
</script>

<div class="button-bar {clazz || ''}">
	<ul>
		<li>
			<button type="button" on:click={resetCamera}>Reset Camera</button>
		</li>
		<li>
			<button type="button" on:click={screenshotToClipBoard}>Screenshot (to clipboard)</button>
		</li>
		<li><button type="button" on:click={screenshotDownload}>Screenshot (save)</button></li>
	</ul>
</div>

<style lang="postcss">
	.button-bar {
	}
	.button-bar ul {
		@apply flex gap-1 bg-slate-700 text-xs text-slate-50 p-1;
	}
	.button-bar li {
		@apply gap-1;
	}
	.button-bar button {
		@apply bg-slate-400 px-2 py-1 rounded border border-slate-500;
	}
</style>
