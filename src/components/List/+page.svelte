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
	import Spinner from './spinner.svelte';
	import type { pindata } from '$lib/db/pin-data';

	let data: any[] = [];
	$: profile = false;
	$: search = false;
	$: selectedItems = $list ?? ([] as ExtractedPin[]);
	$: selectedCount = $list.length;
	$: filteredData = [];
	$: txt = selectedCount < 1 ? 'Select All' : 'Invert Selection';
	$: runningAction = false;
	$: selectedPage = 1;

	(async () => {
		let pins: ExtractedPin[] = [];
		try {
			pins = (await pbStore
				.collection('pins')
				.getList<{ pin: any }>(1, 105)
				.then((res) => {
					console.log({ res });
					return res.items;
				})
				.then((res) => {
					return res.map((r) => GetPinData(r.pin));
				})
				.then((res) => {
					return res.filter(Boolean);
				})) as unknown as ExtractedPin[];
		} catch (e) {
			console.error({ e });
		}

		data =
			pins?.length > 0
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

	const filterData = (term: HTMLInputElement) =>
		(filteredData = data.filter((pin: ExtractedPin) => {
			const input = (term as any).toLowerCase();
			console.log({ input });
			console.log(filteredData.length);

			console.log(
				pin.name,
				pin.name.toLocaleLowerCase().includes(input),
				pin.board,
				pin.board.toLocaleLowerCase().includes(input)
			);

			return pin.board.toLowerCase().includes(input);
		}));

	async function handleForm(e: { target: { action: any } }) {
		// console.log({ formData });
		const formData = new FormData(<any>e.target);
		const url = `http://localhost:3000/`;
		for (const field of formData) {
			console.log(field);
			// data = <ExtractedPin[]>await (await fetch('http://localhost:3000/pins')).json();
			if (field && profile) {
				runningAction = true;
				// let rl = `${url}pin/profile/${field[1]}/`;
				// data = (await (await fetch(rl)).json()) as ExtractedPin[];
				data = await pbStore
					.collection('pins')
					.getList<ExtractedPin>(1, 20)
					.then((res) => {
						console.log({ res });
						return res.items;
					});
				runningAction = false;
			}
			if (field && search) {
				runningAction = true;
				data = (await (await fetch(`${url}pin/search/${field[1]}/`)).json()) as ExtractedPin[];
			}
			if (field && !search && !profile) {
				alert('Please select an option.');
			}
		}
	}
</script>

<div class="flex flex-col">
	<div class="btn-sm max-w-0">Select many</div>
	<div class="max-w-0">
		{selectedCount}
	</div>

	<form
		on:submit|preventDefault={handleForm}
		class="my-0 mx-auto w-[100%] flex-shrink-0 flex-nowrap"
	>
		{#if runningAction}
			<div class="border-cyan-500">
				LOADING...
				<Spinner />
			</div>
		{/if}
		<label for="term" class="max-w-none">
			Search Term
			<input
				on:keyup={(value) => {
					console.log(value.target?.value);
					console.log(filterData(value.target?.value));
					filteredData = filterData(value.target?.value);
				}}
				value=""
				type="text"
				class="input variant-filled-surface m-5 p-1 max-w-xs variant-outline-primary variant-filled-tertiary"
				name="term"
			/>
		</label>
		<div class="max-w-xs" id="pin-list-form">
			<label for="Profile">
				<p>Profile</p>
				<input
					type="radio"
					value="Profile"
					name="query"
					on:change={() => {
						profile = !profile;
						console.log({ profile });
					}}
				/>
			</label>
			<label for="Search">
				<p>Search</p>
				<input
					type="radio"
					name="query"
					value="Search"
					on:change={() => {
						search = !search;
						console.log({ search });
					}}
				/>
			</label>
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
			on:click={async () => {
				console.log({ selected: selectedItems });
				// generate_zip();
				const response = await fetch('/api/pins/', {
					method: 'POST',
					body: JSON.stringify({ pins: selectedItems }),
					headers: {
						'Content-Type': 'application/zip'
					}
				});
				await response.blob().then((blob) => {
					const url = window.URL.createObjectURL(blob);
					const a = document.createElement('a');
					a.href = url;
					a.download = 'pins.zip';
					a.click();
				});
			}}>Zip All</button
		>
	</div>
	<section class="m-auto grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-x-5 gap-y-20">
		{#each filteredData.length > 0 ? filteredData : data as pin}
			<div class="" id="pin_select">
				<ListItem data={pin} />
			</div>
		{/each}
	</section>
</div>
