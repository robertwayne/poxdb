<script>
    import Header from '../components/Header.svelte'
</script>
<style>
    p {
        display: flex;
        justify-content: center;
        font-size: 14pt;
    }

    p > a {
        text-decoration: none;
        color: var(--theme-primary-accent);
    }

    p > a:hover {
        font-weight: bold;
    }
</style>

<Header />
<main>
    <div>
        <p>Uh oh!</p>
        <p>That page doesn't seem to exist!</p>
        <br>
        <p><a href='#/'>...return home</a></p>
    </div>
</main>
