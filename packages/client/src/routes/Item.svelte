<script>
    import { onMount } from 'svelte'
    import { pop } from 'svelte-spa-router'
    import { item } from '../stores'
    import NavHeader from '../components/NavHeader.svelte'
    import { url } from '../constants'

    export let params = {}

    onMount(() => {
        function getPart() {
            fetch(`${url}/db?itemID=${params.id}`)
                .then(res => res.json())
                .then(data => $item = data)
        }

        getPart()

        document.getElementById('go-back').addEventListener('click', (ev) => {
            ev.preventDefault()
            pop()
        })
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
        margin: 0 10px;
    }

    #name {
        padding: 2px 0;
        border: none;
    }

    #meta-info {
        display: inline-flex;
        flex-direction: row;
        align-items: stretch;
        border: none;
    }

    #meta-info > span {
        padding: 0 15px;
        font-weight: bold;
    }

    #meta-info > span:first-child {
        padding-left: 0;
    }

    #activation-table {
        display: inline-flex;
        flex-direction: row;
        align-items: stretch;
    }

    #activation-table > div {
        height: 100px;
        width: 100%;
        border: 1px var(--theme-primary-lighter) solid;
        padding: 6px;
        margin-top: 10px;
    }

    #activation-table > div:nth-child(1) {
        margin-right: 5px;
    }

    #go-back {
        /*padding: 0 10px;*/
        margin: 10px 0;
    }

    #container {
        padding: 10px;
        margin: 0 10px;
    }

    .key {
        font-weight: bold;
    }

</style>

<NavHeader/>

<main>
    <div class='row'>
        <a id='go-back' href='#'>Go back...</a>
    </div>
    <div id='container'>
        <div id='name' class='row'>
            <h1>{$item.name}</h1>
        </div>
        <div id='meta-info' class='row'>
            <span id='short-name'>{$item.short_name}</span>
            <span id='type-name'>{$item.type_name}</span>
            <span id='loc-name'>{$item.loc_name}</span>
        </div>
        <div id ='body' class='row'>
            <p>
                {$item.description}
            </p>
        </div>
        <div id='activation-table' class='row'>
            <div>
                <span class='key'>Trigger: </span><span>{$item.trigger_name}</span> --
                <span>{$item.trigger_desc}</span>
            </div>
            <div>
                <span class='key'>Frequency: </span><span>{$item.freq_name}</span> --
                <span>{$item.freq_desc}</span>
            </div>
        </div>
    </div>
</main>
