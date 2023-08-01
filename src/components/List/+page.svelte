<script lang="ts">
	import type { ExtractedPin } from '$lib/db/ExtractedPin';
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import ListItem from '../ListItem/ListItem.svelte';
	import { list } from '$lib/pinStore';
	import { pbStore } from '$lib/pinStore';
	import { GetPinData } from '$lib/db/GetPinData';
	import { AsyncCompress, AsyncGzip, zip, zipSync } from 'fflate';

	let data: any[] = [];
	$: profile = false;
	$: search = false;
	$: selectedItems = $list ?? ([] as ExtractedPin[]);
	$: selectedCount = $list.length;

	$: txt = selectedCount < 1 ? 'Select All' : 'Invert Selection';
	(async () => {
		let pins = await pbStore
			.collection('pins')
			.getList<any>(1, 100)
			.then((res) => {
				console.log({ res });
				return res.items;
			})
			.then((res) => {
				return res.map((r) => GetPinData(r.pin));
			})
			.then((res) => {
				return res.filter(Boolean);
			});

		data =
			pins.length > 0
				? (pins as unknown as ExtractedPin[])
				: ([
						...new Array(100).fill(100).map(() => ({
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
				  ] as ExtractedPin[]);
	})();

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
		}
	}
	async function generate_zip() {
		let zipobj = {} as any;

		for await (const l of selectedItems) {
			let img = await fetch(l.url, {
				headers: {
					'Access-Control-Allow-Origin': '*'
				}
			}).then((res) => res.blob());
			const arrayBuffer = await img.arrayBuffer();
			zipobj[l.name] = new Uint8Array(arrayBuffer);
		}

		let z = zipSync(zipobj);
		let b = new Blob([z]);
		let u = URL.createObjectURL(b);
		let a = document.createElement('a');
		a.href = u;
		a.download = 'pins.zip';
		a.click();
	}
</script>

<img src="favicon.png" alt="" srcset="" />

<div class="flex flex-col">
	<div class="btn-sm max-w-0">Select many</div>
	<div class="max-w-0">
		{selectedCount}
	</div>

	<form
		on:submit|preventDefault={handleForm}
		class="my-0 mx-auto w-[100%] flex-shrink-0 flex-nowrap"
	>
		<label for="term" class="max-w-none">
			Search Term
			<input
				type="text"
				class="input variant-filled-surface m-5 p-1 max-w-xs variant-outline-primary variant-filled-tertiary"
				name="term"
			/>
		</label>
		<div class="max-w-xs" id="pin-list-form">
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
		<input type="submit" class="btn variant-filled-surface" value="submit" />
	</form>

	<div class="zbtn">
		<style>
			.zbtn {
				position: fixed;
				bottom: 0;
				right: 0;
				margin: 1rem;
			}
		</style>
		<button
			class="btn variant-filled-surface"
			on:click={() => {
				document.querySelectorAll('#pin_select').forEach((el) => {
					el.parentElement?.click();
				});
			}}>{txt}</button
		>
		<button
			class="btn variant-filled-surface"
			on:click={() => {
				console.log({ selected: selectedItems });
				generate_zip();
			}}>Zip All</button
		>
	</div>
	<section class="m-auto grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-x-5 gap-y-20">
		{#each data as pin}
			<div class="" id="pin_select">
				<ListItem data={pin} />
			</div>
		{/each}
	</section>
</div>
