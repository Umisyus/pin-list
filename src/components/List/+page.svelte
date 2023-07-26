<script lang="ts">
	import type { ExtractedPin } from '$lib/db/ExtractedPin';
	import { GetPinData } from '$lib/db/GetPinData';
	import { ListBox, ListBoxItem, Table, RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import ListItem from '../ListItem/ListItem.svelte';

	let data: ExtractedPin[] = [
		...new Array(100).fill(100).map((i) => ({
			board: 'BOARD-NAME',
			name: 'IMAGE-NAME',
			url: 'https://images.unsplash.com/photo-1553184570-557b84a3a308?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzY2NTF8&ixlib=rb-4.0.3&w=128&h=128&auto=format&fit=crop',
			username: '',
			id: crypto.randomUUID(),
			type: '',
			ext: '',
			hash: '',
			section: ''
		}))
	] as ExtractedPin[];

	for (let index = 0; index < 50; index++) {
		data.push(data[0]);
	}
	$: isSelected = false;
	console.log({ data });

	$: profile = false;
	$: search = false;

	$: selected = [] as any[];
	$: selectedCount = 0;

	async function handleForm(e: { target: { action: any } }) {
		// console.log({ formData });
		const formData = new FormData(<any>e.target);
		const url = `http://localhost:3001/`;
		for (const field of formData) {
			console.log(field);
			// data = <ExtractedPin[]>await (await fetch('http://localhost:3000/pins')).json();
			if (field && profile) {
				let rl = `${url}pins/profile/${field[1]}/`;
				data = (await (await fetch(rl)).json()) as ExtractedPin[];
			}
			if (field && search) {
				data = (await (await fetch(`${url}pins/search/${field[1]}/`)).json()) as ExtractedPin[];
			}
			if (field && !search && !profile) {
				alert('Please select an option.');
			}
			// data = data as ExtractedPin[];
			console.log({ data });
		}
	}
</script>

<div class="btn-sm">Select many</div>
<div class="">
	{selectedCount}
</div>

<form on:submit|preventDefault={handleForm} class="w-60 m-auto">
	<label for="term">
		Search Term
		<input
			type="text"
			class="input variant-filled-surface m-5 p-1 variant-outline-primary variant-filled-tertiary"
			name="term"
		/>
	</label>

	<input type="submit" class="btn variant-filled-surface m-100%" value="submit" />
	<div>
		<input
			type="radio"
			value="Profile"
			name="query"
			on:change={() => {
				profile = !profile;
				console.log({ profile });
			}}
		/>
		<input
			type="radio"
			name="query"
			value="Search"
			on:change={() => {
				search = !search;
				console.log({ search });
			}}
		/>
	</div>
</form>

<section class="m-auto grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-x-5 gap-y-20">
	{#each data as pin}
		<div class="" id="pin_select">
			<ListItem data={pin} />
		</div>
	{/each}
	<div>
		<img
			class="h-auto max-w-full rounded-lg"
			src="https://images.unsplash.com/photo-1553184570-557b84a3a308?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzY2NTF8&ixlib=rb-4.0.3&w=128&h=128&auto=format&fit=crop"
			alt="pin"
		/>
	</div>
	<div>
		<img
			class="h-auto max-w-full rounded-lg"
			src="https://images.unsplash.com/photo-1617296538902-887900d9b592?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzExMDB8&ixlib=rb-4.0.3&w=128&h=128&auto=format&fit=crop"
			alt=""
		/>
	</div>
</section>
