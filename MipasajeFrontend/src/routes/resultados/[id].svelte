<script context="module">
    import {client} from '$store/store';
    import { getJourney } from '$store/queries/get/search';
    export async function load({params}){
        const idJourney = params.id

        const { data: {journey : journey }} = await client.query(getJourney(idJourney)).toPromise();
        return {
            props:{
                journey
            }
        };
    }
</script>

<script>
    import { fade } from 'svelte/transition';
    import Box from '$lib/components/seleccion/valores.svelte';
    import Valores from '$lib/components/seleccion/info.svelte';
    import Asiento from '$lib/components/seats/asiento.svelte';
    import Info from '$lib/components/seats/infoSeats.svelte';
    import Button from '$lib/ui/button.svelte';
    import { asientos, data }from '../../store/store';
    import { onMount } from 'svelte';
    import Locations from '$lib/components/resultCard/information.svelte';
    import Card from '$lib/components/seats/infoCard.svelte';
    import { goto } from '$app/navigation';


    export let journey;
    console.log(journey)
    let precio = journey.price
    let arrival = journey.arrival
    console.log(arrival)
    let departure = journey.departure
    let seatType = journey.bus.seatType

    onMount(() => {
        asientos.set([]);
    })

    let origen, destino;

    $: {
		if($data){
			origen = $data.origen.name;
			destino = $data.destino.name;
		}
	}

    let ocupado = true
    let segundo = false

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
    $:  console.log($asientos)

    let seats = ['A-2', 'A-3', 'A-4'];

    let scroll;
    $:{
        if(scroll >= 300){
            segundo = true;
        }else{
            segundo = false;
        }
    };
</script>


{#if $asientos.length > 0}
    <Box>
        <div class="mb-2"><Valores cantidad={$asientos.length} {precio} /></div>
        <div class="mx-4 pb-8"> <a href="/checkout/[object&20Object]_90/"><Button /></a> </div>
        
    </Box>
{/if}

<div out:fade={{duration:150}}>
    <div>
        <div class="fixed h-screen bg-[#F6F7F9] inset-0 -z-10"></div>
        <div class="fixed top-0 -z-10">
            <div in:fade="{{duration:2000}}">
                <img class="w-screen h-auto" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/1d/7c/87/corani-lake.jpg?w=500&h=-1&s=1" alt="">
            </div>
        </div>
        <div class="fixed top-0 h-[40vh] w-screen bg-gradient-to-b from-[#7A2EF8] to-[#E3BCBC] transform opacity-70 -z-10">
        </div>
        <div class="fixed top-[200px] -z-10">
            <img src="/iconos/Rectangle 8.svg" alt="">
        </div>
        <div>

            <div class="pt-4 pb-4"> <Locations {origen} {destino}/></div>
            
            <div class="container mx-auto mt-10 px-8">
                 <Card {seatType} {departure} {arrival}/>
                 <div class="mt-16 mb-8"> 
                    <Info />
                 </div>
                
             </div>

            <div class="flex mb-5">
                <div class="flex-initial mx-auto">
                    <div class="flex space-x-3">
                        {#if !segundo}
                            <div class="h-2.5 w-2.5 rounded-full bg-[#5174F2]"></div>
                            <div class="h-2.5 w-2.5 rounded-full bg-gray-200"></div>
                        {:else}
                            <div class="h-2.5 w-2.5 rounded-full bg-gray-200"></div>
                            <div class="h-2.5 w-2.5 rounded-full bg-[#5174F2]"></div>
                        {/if}
                    </div>
                </div>   
            </div>
            

            <ul class="flex pb-10 overflow-x-auto gap-x-20 snap-x snap-mandatory before:shrink-0 after:shrink-0 after:w-[30vw] mb-40 box scrollbar-hide content" on:scroll={(e)=> scroll=e.target.scrollLeft}>
        
                <li in:fade="{{duration:250,delay:200}}" class="shrink-0 snap-center w-80 h-full rounded-[50px] border-2 border-gray-100  bg-white drop-shadow-xl" >
                
                    <div class="container mx-auto">
                        <div class="grid grid-cols-1 mt-5 pb-10 m-2">
                            <div class="flex mt-2">
                                <div class="flex flex-wrap space-y-4 justify-around">
                                    {#each Array(journey.bus.seatsDownstairs) as _, i}
                                        {#if seats.includes(`A-${i+1}`)}
                                            <Asiento {ocupado} num={i+1}/>
                                        {:else}
                                            {#if $asientos.length > 0 && $asientos.includes(`A-${i+1}`)}
                                                <Asiento selection=true floor="A" num={i+1} on:seleccion={(e) => {handleEvent(e)}}/>
                                            {:else}
                                                <Asiento  num={i+1}  floor="A" on:seleccion={(e) => {handleEvent(e)}}/>
                                            {/if}
                                        {/if}
                                        
                                    {/each}
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                
            
                <li class="shrink-0 snap-center w-80 h-full rounded-[50px] border-2 border-gray-100  bg-white drop-shadow-xl">
                    <div class="container mx-auto">
                        <div class="grid grid-cols-1 mt-5 pb-10 m-5">
                            <div class="flex mt-2">
                                <div class="flex flex-wrap space-y-4 justify-around">
                                {#each Array(journey.bus.seatsUpstairs) as _, i}
                                    {#if seats.includes(`B-${i+1}`)}
                                        <Asiento {ocupado} num={i+1}/>
                                    {:else}
                                        {#if $asientos.length > 0 && $asientos.includes(`${i+1}`)}
                                            <Asiento selection=true  num={i+1} on:seleccion={(e) => {handleEvent(e)}}/>
                                        {:else}
                                            <Asiento  num={i+1}  on:seleccion={(e) => {handleEvent(e)}}/>
                                        {/if}
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
    <div class="fixed top-5 left-4 z-10">
        <button on:click={() => goto('/resultados')}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
        </button>
    </div>

</div>
