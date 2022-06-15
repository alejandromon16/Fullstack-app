<!-- <script>
    import { afterUpdate, onMount, onDestroy, beforeUpdate } from 'svelte';
    import PSPDFKit from 'pspdfkit'

    let currentDocument
    let container
    let instance

    export let document

    async function load() {
        currentDocument = document
        instance = await PSPDFKit.load({
            baseUrl: `${window.location.protocol}//${window.location.host}/`,
            container: container,
            document: document
        })
    }

    function unload() {
        PSPDFKit.unload(instance)
        instance = null
    }

    onMount(() => {
        load()
    })

    afterUpdate(() => {
        if (document !== currentDocument) {
            unload()
            load()
        }
    })

    onDestroy(() => {
        unload()
    })

</script> -->

<script>
    
</script>





<div class="container">
    <div class="column-1">
        <div class="text-frame">
            <div class="event">PSPDFKit TALENT SHOW</div>
            <div class="date">26 August, 2021</div>
            <br />
            <div class="name">John Smith</div>
            <div class="ticket-id">#123456</div>
        </div>
    </div>

    <div class="column-2">
        <div class="qr-holder">
        </div>
    </div>
</div>

<style>
    .container {
        width: 602px;
        height: 200px;
        margin: 0 auto;
        border-radius: 4px;
        background-color: #4537de;
        box-shadow: 0 8px 16px rgba(35, 51, 64, 0.25);
    }
    .column-1 {
        float: left;
        width: 400px;
        height: 200px;
        border-right: 2px dashed #fff;
    }
    .column-2 {
        float: right;
        width: 200px;
        height: 200px;
    }
    .text-frame {
        padding: 40px;
        height: 120px;
    }
    .qr-holder {
        position: relative;
        width: 160px;
        height: 160px;
        margin: 20px;
        background-color: #fff;
        text-align: center;
        line-height: 30px;
        z-index: 1;
    }
    .event {
        font-size: 24px;
        color: #fff;
        letter-spacing: 1px;
    }
    .date {
        font-size: 18px;
        line-height: 30px;
        color: #a8bbf8;
    }
    .name,
    .ticket-id {
        font-size: 16px;
        line-height: 22px;
        color: #fff;
    }
</style>