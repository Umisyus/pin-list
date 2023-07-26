<script lang="ts">
	import type { ExtractedPin } from '$lib/db/ExtractedPin';
	import { setContext } from 'svelte';
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

	let isSelected = false;
	let pin = data as ExtractedPin;

	setContext('data', data);
</script>

<div class="ml-1" id="pin_select">
	<!-- <input type="checkbox" name="pin_select" id="pin_select" /> -->
	<!-- svelte-ignore a11y-missing-attribute -->
	<!-- svelte-ignore a11y-interactive-supports-focus -->
	<a
		id="pin_select"
		rel="noopener noreferrer"
		aria-label="Select a pin"
		aria-roledescription=""
		role="button"
	>
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<img
			on:click={() => {
				// selected.push(pin);
				// ++selectedCount;
				isSelected = !isSelected;
				console.log({ isSelected });
			}}
			class="
            border {isSelected ? 'border-emerald-200' : 'border-red-600'}
            <!-- h-auto -->
            max-w-md rounded-lg
            m-auto"
			src={pin.url}
			alt={pin.name}
		/>
		<p class="detail">
			{pin.name}
			{pin.board}
			<!-- {pin.id} -->
		</p>
	</a>
</div>

<style>
	p.detail {
		position: absolute;
		text-align: center;
		justify-content: center;
		max-width: 10%;
		margin-top: -3%;
		margin-bottom: -10%;
		margin-left: -1%;
		margin-right: 6%;
		/* margin: 10% -3% auto auto; */
	}

	p.detail {
		visibility: hidden;
	}

	input#pin_select {
		position: absolute;
		margin: 0% 0% 1% 6%;
	}

	a#pin_select {
		/* position: absolute; */
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
