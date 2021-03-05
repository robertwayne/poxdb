<script>
    import { onMount } from 'svelte'
    import { link, push } from 'svelte-spa-router'
    import { autocomplete, results } from '../stores'
    import { url } from '../constants'


    onMount(() => {
        const searchElement = document.getElementById('search-wrapper')
        let searchValueElement = document.getElementById('search')
        let tempValue = ''
        let timeout

        const placeholders = [
            'Adrenal Acronodes',
            'Azurhalo',
            'Encdothoracic Ectoblast',
            'Jade Resin Carapace',
            'Cranial Amphasers',
            'Toroidal Spore Cannon',
            'Cyclic Aggression Regulator',
            'Homeostatic Underplating',
            'Diffusion Web Shield'
        ]

        document.getElementById('search').placeholder = placeholders[placeholders.length * Math.random() | 0]
        document.getElementById('search').focus()

        // note: keypress doesn't propagate `backspace` so we use keydown
        searchElement.addEventListener('keydown', async (_) => {
            clearTimeout(timeout)

            // debounce fn to prevent GET requests on every key stroke
            timeout = setTimeout(async () => {
                if (searchValueElement.value === null) return
                let value = searchValueElement.value

                if (tempValue === value.trim()) {
                    return
                }

                tempValue = searchValueElement.value

                // only search if there's 2+ characters; optimizes results & less GET requests
                if (value.length > 1) {
                    await getPart(value)
                }

                // empty the autocomplete store so we can hide the popup
                if (value.length < 2) {
                    $autocomplete = []
                }

                // hide the popup if the store is empty
                if ($autocomplete.length > 0) {
                    document.getElementById('search-autocomplete').classList.remove('hidden')
                } else {
                    document.getElementById('search-autocomplete').classList.add('hidden')
                }
            }, 250)
        })

        searchElement.addEventListener('submit', async (ev) => {
            ev.preventDefault()
            if (searchValueElement.value === null) return
            let value = searchValueElement.value

            if (value && value.trim()) {
                await getResults()
                await push('#/results')
            }
        })

        const autocompleteElement = document.getElementById('search-autocomplete')
        autocompleteElement.addEventListener('keydown', (ev) => {
            if (ev.key === 'ArrowDown') {
                autocompleteElement.focus()
                autocompleteElement.tabIndex++
            }
        })
    })

    async function getResults() {
        const data = document.getElementById('search').value.trim()
        await fetch(`${url}/db?search=${data}&limit=100`)
            .then(res => res.json())
            .then(data => $results = data)

    }

    async function getPart(searchTerms) {
        await fetch(`${url}/db?search=${searchTerms}`)
            .then(res => res.json())
            .then(data => displayData(data))
    }

    function displayData(data) {
        $autocomplete = []
        for (let item of data) {
            if (!$autocomplete.includes(item)) {
                $autocomplete = [...$autocomplete, item]
            }
        }
    }
</script>

<style>
    #search-wrapper {
        display: flex;
        justify-content: center;
        height: 33px;
        width: 100%;
    }

    #search {
        width: 70%;
        border-radius: 6px 0 0 6px;
        border: none;
        background-color: var(--theme-primary-lighter);
        padding: 4px 7px;
        outline: none;
        font-weight: bold;
        font-size: 12pt;
    }

    @media (min-width: 1024px) {
        #search {
            width: 28%;
        }
    }

    #search-icon-wrapper {
        display: flex;
        background-color: var(--theme-primary-lighter);
        border-radius: 0 6px 6px 0;
        padding: 4px;
    }

    #search-icon {
        height: 20pt;
    }

    .hidden {
        display: none;
    }

    #autocomplete-wrapper {
        display: flex;
        align-self: center;
        width: 30%;
    }

    #search-autocomplete {
        background-color: var(--theme-primary-shadow);
        border: 1px var(--theme-primary-lighter) solid;
        height: max-content;
        width: 100%;
        padding: 0;
        list-style: none;
    }

    #search-autocomplete li {
        border-top: 1px solid var(--theme-primary-lighter);
        padding: 0 8px;
    }

    #search-autocomplete li:hover {
        background-color: var(--theme-primary-accent);
        color: var(--theme-primary-shadow);
        font-weight: bold;
        cursor: pointer;
    }

    #search-autocomplete a {
        text-decoration: none;
        color: inherit;
    }

    ::placeholder {
        color: var(--font-primary);
        font-style: italic;
        font-weight: lighter;
        opacity: 50%;
    }
</style>

<form id='search-wrapper' autocomplete='off' spellcheck='false'>
    <label for='search'></label><input tabindex='0' id='search' type='text' placeholder=''>
    <div id='search-icon-wrapper'>
        <img id='search-icon' src='/static/svg/search.svg' alt='search icon'>
    </div>
</form>
<div id='autocomplete-wrapper'>
    <ul id='search-autocomplete' class='hidden'>
        {#each $autocomplete as item}
            <li><a href='/items/{item.id}' use:link>{item.name}</a></li>
        {/each}
    </ul>
</div>
