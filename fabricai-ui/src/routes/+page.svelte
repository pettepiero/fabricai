<script>
	import { Button } from 'flowbite-svelte';
	import { Icon } from 'svelte-icons-pack';
	import { IoDice, IoSettingsSharp } from 'svelte-icons-pack/io';
    import WordSelector from '$lib/components/WordSelector.svelte';
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
	<div class="mt-40 px-4">
        <!-- Main Text -->
		<!-- <div class="text-2xl font-semibold">
			I want a <span class="text-primary-500">skirt</span> with a pattern of
			<span class="text-primary-500">flowers</span>
			and
			<span class="text-primary-500">butterflies</span>
		</div> -->
        <div class="text-2xl font-semibold">
            I want a <WordSelector /> with a pattern of
            <WordSelector />
            and
            <WordSelector />
        </div>
		<div class="mt-8 space-x-1">
			<Button class="rounded-2xl px-3"
				><Icon color="white" size="1.4em" src={IoSettingsSharp} /></Button
			>
			<Button class="rounded-2xl px-3"><Icon color="white" size="1.4em" src={IoDice} /></Button>
		</div>
	</div>

	<!-- Submit -->
	<div class="fixed bottom-4 left-0 w-full flex justify-center pb-4">
		<Button class="px-8 py-4 uppercase font-bold rounded-2xl" href="/detail">Craft my idea</Button>
	</div>
</div>
