<script>
	import { AppBar, AppShell, LightSwitch } from '@skeletonlabs/skeleton';
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	// import '../app.postcss';
</script>

<AppShell>
	<div class="m-6">
		<LightSwitch />
	</div>
	<svelte:fragment slot="header">App Bar</svelte:fragment>
	<slot />
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter">Page Footer</svelte:fragment>
	<!-- (footer) -->
</AppShell>
