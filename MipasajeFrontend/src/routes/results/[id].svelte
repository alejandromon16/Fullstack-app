<script context="module">
    import { getSearchBus } from '../../store/queries/get/Bus';


    export async function load({params}) {
        const id = params.id;
        const  data = await fetchData(getSearchBus(id));
        console.log(data);

        return {
            props: {data},
        }
    }

</script>

<script>
    import { fade } from 'svelte/transition';
    import ValorIndicador from '$lib/components/seleccion/valores.svelte';
    import Asiento from '$lib/components/seats/asiento.svelte';
    import Info from '$lib/components/seats/infoSeats.svelte';1
    import { asientos }from '../../store/store';
    import { onMount } from 'svelte';

    onMount(() => {
        asientos.set([]);
    })


    let box
    let xScroll = 0
    let yScroll = 0
    let segundo = false

    function parseScroll() {
        xScroll=box.scrollLeft
        yScroll=box.scrollTop
    }

    $: console.log(xScroll);
    $:{
        if(xScroll >= 300){
            segundo = true;
        }else{
            segundo = false;
        }
    } 

    export let data;
    console.log(data.bus.precio)


    let cantidadArriba = data.bus.asientosArriba;
    let cantidadAbajo = data.bus.asientosAbajo;

    const handleEvent = (e) => {
        
        let id = e.detail.ID
        handleStatus(id)
    };

    const handleStatus = (id) => {
        console.log(id)
        if($asientos.includes(id)){
            $asientos = $asientos.filter((e) => e !== id)
        }else{
            $asientos = [...$asientos, id];
        }
    };

    const abajo = data.bus.asientos.slice(0, cantidadAbajo);
    console.log(abajo);
    const arriba = data.bus.asientos.slice(cantidadAbajo);
    console.log(arriba);

    
</script>

{#if $asientos.length > 0}
    <ValorIndicador precio={data.bus.precio} cantidad={$asientos.length} bus={data.bus}/>
{/if}


<div in:fade={{ duration: 200 }}>
    <div class="flex justify-between h-12 mb-5 text-left">
        <div class="ml-5 mt-2">
            <h1 class="font-gt font-base font-medium text-gray-400 text-2xl">Selecciona Asientos</h1>
        </div>
        <div class="pt-4 mr-10">
            <a href="/results">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 10 10"
                        ><path
                            d="M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12"
                            fill="#6f7980"
                            fill-rule="evenodd"
                        /></svg
                    >
                </div>
            </a>
        </div>
    </div>
    <div class="ml-8 mb-10">
        <Info />
    </div>
        <div class="flex mb-2 mt-3">
            <div class="flex-initial mx-auto">
                <div class="flex space-x-3">
                    {#if !segundo}
                        <div class="h-2.5 w-2.5 rounded-full bg-blue-bus"></div>
                        <div class="h-2.5 w-2.5 rounded-full bg-gray-200"></div>
                    {:else}
                        <div class="h-2.5 w-2.5 rounded-full bg-gray-200"></div>
                        <div class="h-2.5 w-2.5 rounded-full bg-blue-bus"></div>
                    {/if}
                </div>
            </div>   
        </div>
    <div>
        <ul class="flex overflow-x-auto gap-x-20 snap-x snap-mandatory before:shrink-0 after:shrink-0 after:w-[30vw] mb-40 box" bind:this={content}>
        
            <li class="shrink-0 snap-center w-80 h-full rounded-lg border-2 border-gray-100 shadow-inner" >
            
                <div class="container mx-auto">
                    <div class="grid grid-cols-1 mt-5 m-5">
                        <div class="flex justify-center ml-1 h-14 w-14 rounded-lg shadow-md text-center bg-gray-200">
                            <img class= "h-7 w-7  self-center" src="/iconos/volante.png" alt="">
                        </div>
                        <div class="flex">
                            <div class="flex flex-wrap space-y-4 justify-around">
                                {#each abajo as {id, estadoAsiento}, i}
                                        {#if $asientos.length > 0 && ($asientos.includes(id))}
                                            <Asiento selection=true id={id} num={i+1} on:seleccion={(e) => {handleEvent(e)}}/>
                                        {:else}
                                            <Asiento id={id} num={i+1} estado={estadoAsiento} on:seleccion={(e) => {handleEvent(e)}}/>
                                        {/if}
                                {/each}
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        
            <li class="shrink-0 snap-center w-80 h-full rounded-lg border-2 border-gray-100 shadow-inner">
                <div class="container mx-auto">
                    <div class="grid grid-cols-1 mt-5 m-5">
                        <div>
                            <img class="w-64 h-12" src="/iconos/parabrisas.png" alt="">
                        </div>
                        <div class="flex">
                            <div class="flex flex-wrap space-y-4 justify-around">
                                {#each arriba as {id, estadoAsiento}, i}
                                        {#if $asientos.length > 0 && ($asientos.includes(id))}
                                            <Asiento selection=true id={id} num={i+1} on:seleccion={(e) => {handleEvent(e)}}/>
                                        {:else}
                                            <Asiento id={id} num={i+1} estado={estadoAsiento} on:seleccion={(e) => {handleEvent(e)}}/>
                                        {/if}
                                {/each}
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>  
</div>