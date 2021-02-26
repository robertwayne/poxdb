<script>
    import { results } from '../stores'
    import NavHeader from '../compoments/NavHeader.svelte'
    import { onMount } from 'svelte'
    import { link } from 'svelte-spa-router'

    onMount(() => {

    })
</script>

<style>
    main {
        grid-area: main;
        display: flex;
        flex-direction: column;
        justify-self: center;
        justify-content: flex-start;
        width: 90%;
        height: 100%;
        background-color: var(--theme-primary-shadow);
        padding: 10px 0;
    }

    .row {
        display: flex;
        flex-direction: column;
        height: max-content;
    }

    ul {
        margin: 0;
        padding: 0 10px;
        height: 100%;
    }

    li {
        display: flex;
        flex-direction: column;
        height: max-content;
        background-color: var(--theme-primary);
        margin: 2px 0;
    }

    li:nth-child(even) {
        background-color: var(--theme-primary-shadow);
    }

    li > a {
        padding: 0 10px;
        text-decoration: none;
        font-size: 16pt;
    }

    #no-results {
        display: flex;
        justify-content: center;
        text-align: center;
        padding-top: 5%;
        font-size: 18pt;
    }

    #go-back {
        padding: 0 10px;
        margin: 10px 0;
    }

    #result-list {
        height: 100%;
    }

    #total {
        text-align: center;
    }

</style>

<NavHeader />
<main>
    <div class='row'>
        <a id='go-back' href='#'>Go back...</a>
    </div>
    <div id='result-list' class='row'>
        <ul>
            {#if $results.length === 0}
                <div id='no-results'>
                    <p>There are no items matching your search!
                        <br>
                        <a href='/'>Try again with a different query.</a>
                    </p>

                </div>
            {:else}
                {#each $results as result}
                    <li><a href='/items/{result.id}' use:link>{result.name}</a></li>
                {/each}
            {/if}
        </ul>
    </div>
    <div id='total' class='row'>
        <span>Total Results: {$results.length}</span>
    </div>
</main>
