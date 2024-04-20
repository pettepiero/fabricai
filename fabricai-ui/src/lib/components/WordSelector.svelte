<script>
    import { onMount, onDestroy } from 'svelte';
    import { writable } from 'svelte/store';

    let word = 'skirt';
    let words = ['skirt', 'dress', 'shirt'];
    let showDropdown = false;

    // Create a unique identifier for this instance of the component
    let id = Math.random().toString(36).substr(2, 9);

    // Create a global store to keep track of the currently open dropdown
    const openDropdown = writable(null);

    function selectWord(event, newWord) {
        word = newWord;
        showDropdown = false;
    }

    function handleClickOutside(event) {
        if (event.target.closest('.dropdown') === null) {
            showDropdown = false;
        }
    }

    if (typeof window !== 'undefined') {
        onMount(() => {
            window.addEventListener('click', handleClickOutside);
        });

        onDestroy(() => {
            window.removeEventListener('click', handleClickOutside);
        });
    }

    // Subscribe to the store and close this dropdown when another one opens
    openDropdown.subscribe(value => {
        if (value !== id) {
            showDropdown = false;
        }
    });
</script>

<span class="relative cursor-pointer inline-block dropdown" on:click="{() => { showDropdown = !showDropdown; openDropdown.set(id); }}" role="button" tabindex="0" on:keydown="{(event) => { if (event.key === 'Enter') showDropdown = !showDropdown; }}">
    <span class="text-primary-500">{word}</span>
    <div class="{showDropdown ? 'block' : 'hidden'} absolute bg-white shadow rounded mt-1 z-50">
        {#each words as newWord (newWord)}
            <button class="block px-4 py-2 hover:bg-gray-200" on:click="{(event) => selectWord(event, newWord)}">{newWord}</button>
        {/each}
    </div>
</span>