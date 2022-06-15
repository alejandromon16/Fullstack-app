<script>
    import { fade } from 'svelte/transition';
    import ValorIndicador from '$lib/components/seleccion/valores.svelte';
    import InfoSelection from '$lib/components/seleccion/info.svelte';
    import Button from '$lib/ui/button.svelte';
    import Asiento from '$lib/components/seats/asiento.svelte';
    import Info from '$lib/components/seats/infoSeats.svelte';1
    import { asientos }from '../../../store/store';
    import { onMount } from 'svelte';
    import {isDark, showModal, toggleModal } from '../../../store/config';

    onMount(() => {
        asientos.set([]);
    })

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
    
    export let data;
    let seats = ["A-1","A-4","A-3"];
</script>

{#if $asientos.length > 0 && !$showModal}
    <div class="mx-20">
        <ValorIndicador> 
            <InfoSelection />
            <div class="mx-4 py-3 ">
                    <Button on:click={toggleModal}/>
            </div>
        </ValorIndicador>
    </div>
{/if}




<main class="h-fit {$isDark ? '':'bg-gray-100'} pb-40 font-gt">
    <div class="container px-6 mx-auto grid">
        <div in:fade={{ duration: 200 }}>
            <div class=" 2xl:ml-80 mb-10 mt-20">
                <Info />
            </div>
            <div>
                <div class="grid grid-cols-2 content-start justify-items-center 2xl:mx-60">
                
                    <div class="w-80 h-full {$isDark ? '':'bg-white'} rounded-lg border-2 border-gray-100 shadow-inner" >
                    
                        <div class="container mx-auto">
                            <div class="grid grid-cols-1 mt-5 m-5">
                                <div class="flex justify-center ml-1 h-14 w-14 rounded-lg shadow-md text-center bg-gray-200">
                                    <img class= "h-7 w-7  self-center" src="/iconos/volante.png" alt="">
                                </div>
                                <div class="flex">
                                    <div class="flex flex-wrap space-y-4 justify-around">
                                        {#each Array(21) as _, i}
                                                {#if $asientos.length > 0 && ($asientos.includes(`A-${i+1}`))}
                                                    <Asiento num={i+1} floor='A' selection=true on:seleccion={(e) => {handleEvent(e)}}/>
                                                {:else}
                                                    <Asiento num={i+1} floor='A' ocupado={seats.includes(`A-${i+1}`) ? true : false } on:seleccion={(e) => {handleEvent(e)}}/>
                                                {/if}
                                        {/each}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <div class=" w-80 h-full {$isDark ? '':'bg-white'} rounded-lg border-2 border-gray-100 shadow-inner">
                        <div class="container mx-auto">
                            <div class="grid grid-cols-1 mt-5 m-5">
                                <div>
                                    <img class="w-64 h-12" src="/iconos/parabrisas.png" alt="">
                                </div>
                                <div class="flex">
                                    <div class="flex flex-wrap space-y-4 justify-around">
                                        {#each Array(21) as _, i}
                                                {#if $asientos.length > 0 && ($asientos.includes(`B-${i+1}`))}
                                                    <Asiento num={i+1} selection=true floor='B' on:seleccion={(e) => {handleEvent(e)}}/>
                                                {:else}
                                                    <Asiento  num={i+1} floor='B' on:seleccion={(e) => {handleEvent(e)}}/>
                                                {/if}
                                        {/each}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>