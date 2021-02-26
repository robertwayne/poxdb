<script lang='typescript'>
    import Router from 'svelte-spa-router'
    import { routes } from './routes.js'
    import '/static/css/themes.css'
</script>

<style>
    :global(*, html, body) {
        margin: 0;
        box-sizing: border-box;
        height: 100%;
        overflow: hidden;
    }

    :global(body) {
        line-height: 1.5;
        background-color: var(--theme-primary);
        color: var(--theme-primary-text);
        font-family: var(--font-primary);
    }

    :global(main) {
        grid-area: main;
        display: flex;
        padding: 7%;
        flex-direction: column;
        justify-content: center;
        height: max-content;
        width: 100%;
    }

    :global(#logo-highlight) {
        color: var(--theme-primary-accent);
    }

    :global(a) {
        text-decoration: underline dotted var(--theme-primary-lighter) 1px;
        color: inherit;
    }

    :global(a:hover) {
        color: var(--theme-primary-accent);
        font-weight: bold;
    }

    .container {
        display: grid;
        grid-template-rows: 75px auto 60px;
        grid-template-areas:
            'header'
            'main'
            'footer';
    }

    footer {
        display: flex;
        justify-content: center;
        height: max-content;
    }

</style>

<div class='container'>
    <Router {routes} />

    <footer>

    </footer>
</div>
