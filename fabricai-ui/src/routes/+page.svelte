<script>
	import { Button } from 'flowbite-svelte';
	import { Icon } from 'svelte-icons-pack';
	import { IoDice, IoSettingsSharp } from 'svelte-icons-pack/io';
	import WordSelector from '$lib/components/WordSelector.svelte';
	import { goto } from '$app/navigation';

	let userInput = '';
	let parsedInput = [];

	// Update parsedInput whenever userInput changes
	$: {
		parsedInput = parseInput(userInput);
	}

	function parseInput(input) {
		// Split the input into words and spaces
		const wordsAndSpaces = input.split(/(\s+)/).filter((e) => e);

		// Replace some words with WordSelector components
		return wordsAndSpaces.map((word) => {
			if (!word.trim()) {
				return ' '; // preserve spaces
			} else if (shouldBecomeWordSelector(word)) {
				return { component: WordSelector, word: word };
			} else {
				return word;
			}
		});
	}

	function shouldBecomeWordSelector(word) {
		// Define the condition for a word to become a WordSelector
		// For example, if the word is 'pattern', 'and', etc.
		return ['skirt', 'yellow', 'blue', 'rough'].includes(word);
	}

	function goToDetailPage() {
		// Convert parsedInput to a string
		const mainText = parsedInput
			.map((item) => (typeof item === 'string' ? item : item.word))
			.join('');
		// Navigate to the detail page with mainText as a query parameter
		goto(`/detail?prompt=${encodeURIComponent(mainText)}`); // <-- Change this line
	}
</script>

<div class="mt-8 px-4 text-center">
	<!--Title-->
	<div class="text-sm text-primary-500">Bug Busters</div>
	<div class="mt-4 text-4xl font-bold uppercase">
		Fabric<span class="text-primary-500">ai</span>
	</div>
	<div class="mt-2 px-8 text-gray-500">
		Helps fashion designer to visualize their ideas (really?)
	</div>

	<!-- Prompting-->
	<div class="mt-32 px-4">
		<!-- Main Text -->
		<div class="text-2xl font-semibold">
			{#each parsedInput as item, index (index)}
				{#if typeof item === 'string'}
					{@html item} <!-- render strings (including spaces) as HTML -->
				{:else}
					<svelte:component this={item.component} word={item.word} />
				{/if}
			{/each}
		</div>
	</div>

	<!-- Missing elements -->
	<div class="hidden mt-6 flex-col text-center">
		<div class="text-sm">You're missing these elements to have a good result!</div>
		<div class="mt-2 flex flex-row space-x-1 justify-center">
			<Button pill>Skirt</Button>
			<Button pill>Material</Button>
			<Button pill>Color</Button>
		</div>
	</div>

	<!-- Submit -->
	<div class="fixed bottom-4 left-0 w-full flex justify-center pb-4">
		<div class="flex flex-col px-4 w-full items-center">
			<div class="mt-4 px-8 w-full">
				<input
					class="w-full text-lg border-transparent focus:border-transparent focus:ring-0"
					bind:value={userInput}
					type="text"
					placeholder="I want a yellow colored skirt..."
				/>
				<div class="mt-8 space-x-1">
					<Button class="rounded-2xl px-3"
						><Icon color="white" size="1.4em" src={IoSettingsSharp} /></Button
					>
					<Button class="rounded-2xl px-3"><Icon color="white" size="1.4em" src={IoDice} /></Button>
				</div>
			</div>

			<Button
				class=" w-52 mt-10 px-8 py-4 uppercase font-bold rounded-2xl"
				on:click={goToDetailPage}>Craft my idea</Button
			>
		</div>
	</div>
</div>
