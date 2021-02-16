<script>
    import { results } from '../stores'
    import NavHeader from '../compoments/NavHeader.svelte'
    import { onMount } from 'svelte'
    import { link } from 'svelte-spa-router'

    onMount(() => {
        console.log($results)
    })
</script>

<style>
    li > a {
        text-decoration: underline;
        color: inherit;
    }

    li > a:hover {
        color: var(--theme-primary-accent);
        font-weight: bold;
    }
</style>

<NavHeader />
<main>
    <ul>
        {#each $results as result}
            <li><a href='/items/{result.id}' use:link>{result.name}</a></li>
        {/each}
    </ul>
</main>
