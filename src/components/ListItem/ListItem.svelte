<script lang="ts">
	import type { ExtractedPin } from '$lib/db/ExtractedPin';
	import { setContext } from 'svelte';
	import { list } from '$lib/pinStore';

	export let data: ExtractedPin = {
		board: 'BOARD-NAME',
		name: 'IMAGE-NAME',
		url: 'https://images.unsplash.com/photo-1553184570-557b84a3a308?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzY2NTF8&ixlib=rb-4.0.3&w=128&h=128&auto=format&fit=crop',
		username: '',
		id: crypto.randomUUID(),
		type: '',
		ext: '',
		hash: '',
		section: ''
	};
	let wasSelected = false;

	let pin = data as ExtractedPin;

	const select = (pin: ExtractedPin) => {
		wasSelected = !wasSelected;
		if (wasSelected) {
			list.update((p) => [...p, pin]);
		} else {
			list.update((p) => p.filter((p) => p.id !== pin.id));
		}
	};
</script>

<div
	class="m-auto"
	id="pin_select"
	on:click={() => {
		console.log(`on click ${pin.id}`);

		select(pin);
		console.log(pin);
	}}
	role="button"
	tabindex="0"
	on:keydown={(e) => {
		if (e.key === 'Enter') {
			console.log(`on enter ${pin.id}`);

			select(pin);
			console.log(pin.id);
		}
	}}
>
	<!-- svelte-ignore a11y-missing-attribute -->
	<!-- svelte-ignore a11y-interactive-supports-focus -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<a
		id="pin_select"
		rel="noopener noreferrer"
		aria-label="Select a pin"
		aria-roledescription=""
		role="button"
	>
		<img
			class="
            border {wasSelected ? 'border-emerald-200' : 'border-red-600'}
            rounded-lg
            m-auto
                  "
			src={pin.url}
			alt={pin.name}
		/>
		<div class="details">
			<p class="detail">
				{pin.name}
			</p>
			<p class="detail">{pin.board}</p>
		</div>
	</a>
</div>

<style>
	.details {
		margin-top: -36%;
	}

	p.detail {
		position: relative;
		text-align: center;
		justify-content: center;
		margin: 1% auto;
		min-width: min-content;
		max-width: 100%;
		word-wrap: break-word;
	}

	p.detail {
		visibility: hidden;
	}

	a#pin_select {
		margin: 0;
		padding: 0%;
	}
	div#pin_select {
		max-width: fit-content;
	}

	div#pin_select:hover p {
		visibility: visible;
	}
</style>
