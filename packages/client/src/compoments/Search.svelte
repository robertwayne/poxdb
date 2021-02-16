<script>
    import { autocomplete, results } from '../stores'
    import { onMount } from 'svelte'
    import { link, push } from 'svelte-spa-router'

    onMount(() => {
        const searchElement = document.getElementById('search-wrapper')
        let tempValue = ''

        searchElement.addEventListener('keyup', async (ev) => {
            const searchValue = document.getElementById('search').value
            if (tempValue === searchValue) {
                return
            }

            tempValue = searchValue

            if (searchValue.length > 0) {
                // setTimeout(async () => {
                //     await getPart(searchValue)
                // }, 500)
                await getPart(searchValue)
            }

            if (document.getElementById('search').value.length === 0) {
                $autocomplete = []
            }

            if ($autocomplete.length > 0) {
                document.getElementById('search-autocomplete').classList.remove('hidden')
            } else {
                document.getElementById('search-autocomplete').classList.add('hidden')
            }
        })

        searchElement.addEventListener('submit', async (ev) => {
            ev.preventDefault()
            await getResults()
            await push('#/results')
        })

        const autocompleteElement = document.getElementById('search-autocomplete')
        autocompleteElement.addEventListener('keydown', (ev) => {
            console.log(ev.key)
            if (ev.key === 'ArrowDown') {
                console.log('down')
                autocompleteElement.focus()
                autocompleteElement.tabIndex++
            }
        })
    })

    async function getResults() {
        const data = document.getElementById('search').value
        await fetch(`http://127.0.0.1:3000/db?search=${data}&limit=100`)
            .then(res => res.json())
            .then(data => $results = data)

    }

    async function getPart(searchTerms) {
        await fetch(`http://127.0.0.1:3000/db?search=${searchTerms}`)
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

    const debounce = (func, wait = 500) => {
        let timeout
        return function(...args) {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                func.apply(this, args)
            }, wait)
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
        padding: 4px;
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

    #search-autocomplete li:first-child {
        border: none;
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
</style>

<form id='search-wrapper' autocomplete='off'>
    <input id='search' type='text'>
    <div id='search-icon-wrapper'>
        <img id='search-icon' src='/static/svg/search.svg'>
    </div>
</form>
<div id='autocomplete-wrapper'>
    <ul id='search-autocomplete' class='hidden'>
        {#each $autocomplete as item}
            <li><a tabindex='0' href='/items/{item.id}' use:link>{item.name}</a></li>
        {/each}
    </ul>
</div>
