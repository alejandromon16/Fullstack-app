<script>
    import { createEventDispatcher } from 'svelte';
	import { fly, fade } from 'svelte/transition';
    import { allFiltros } from '$store/store';
	import FlotaTag from '$lib/components/tags.svelte';
	import Button from '$lib/components/buttonFilter.svelte';

	export let flotas;
    let nombresFlotas = new Array();

    for(let i = 0 ; i < flotas.length; i++){
        nombresFlotas[i] = flotas[i].cliente.nombre
    }
    let unique_nombres_flotas = [...new Set(nombresFlotas)];
    
    let open = false;
    let dispatch = createEventDispatcher();

    const handleEvent = (param) =>{
        dispatch("filtro",{
            Filtro: param
        })
    };

	const handleClick = () => {
		open = !open;
		var contentResults = document.getElementById('results');
		if (open) {
			setTimeout(() => {
				contentResults.classList.toggle('hidden');
			}, 800);
		} else {
			contentResults.classList.toggle('hidden');
		}
	};

    const borrarFiltros = () => {
        allFiltros.set([
            {orderby: "nada"}
        ]);
    };


    const buttonClick = (filtro) => {

          handleEvent(filtro);
    };
</script>

{#if open}
	<div
		in:fly={{ y: 2000, duration: 500 }}
		out:fly={{ y: 2000, duration: 1200 }}
		class="fixed inset-0 z-50 overflow-hidden"
		aria-labelledby="slide-over-title"
		role="dialog"
		aria-modal="true"
	>
		<div class="absolute inset-0 overflow-hidden">
			<div class="absolute inset-0" aria-hidden="true" />
			<div class="fixed inset-y-0 right-0 max-w-full flex">
				<div class="w-screen">
					<div class="h-full flex flex-col bg-white overflow-y-scroll">
						<div   class="flex-1 overflow-y-auto pb-14">
                            <div in:fade="{{ duration: 300, delay: 500 }}" class="flex justify-between mx-6 mt-4">
                                <div>
                                    <button on:click={handleClick} class="w-6 h-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>
                                <div>
                                    <button on:click={borrarFiltros}>
                                        <h1 class="font-gt text-blue-bus">Borrar filtros</h1>
                                    </button>
                                </div>
                            </div>

                            <div in:fade="{{ duration: 300, delay: 500 }}" class="mx-6 mt-10">
                                <div>
                                    <h1 class="font-gt text-3xl font-semibold">Filtrar</h1>
                                </div>
                                <div class="mt-6 font-gt">
                                    <h1 class="text-xl font-normal">Por tipo de asiento</h1>
                                    <div class="mt-5 grid grid-cols-1 space-y-4">
                                        <div class="flex justify-between">
                                            <div class="ml-5">
                                                <h1>Normal</h1>
                                            </div>
                                            <div>
                                               <Button filtro="normal" on:click={() => {buttonClick('normal')}} />
                                            </div>
                                        </div>
                                        <div class="flex justify-between">
                                            <div class="ml-5">
                                                <h1>Semicama</h1>
                                            </div>
                                            <div>
                                                <Button filtro="semicama" on:click={() => {buttonClick('Semicama')}}/>
                                            </div>
                                        </div>
                                        <div class="flex justify-between">
                                            <div class="ml-5">
                                                <h1>Cama</h1>
                                            </div>
                                            <div>
                                                <Button filtro="cama" on:click={() => {buttonClick('Cama')}}/>
                                            </div>
                                        </div>
                                    </div>
                                    <h1 class="mt-10 text-xl font-normal">Ordenado por</h1>
                                    <div class="mt-5 grid grid-cols-1 space-y-4">
                                        <div class="flex justify-between">
                                            <img class="h-6 w-6" src="/iconos/clock.png" alt="" />
                                            <div class="place-self-start mr-16">
                                                <h1>Salida mas temprana</h1>
                                            </div>
                                            <div>
                                                <Button filtro="salida" on:click={() => {buttonClick('salida')}}/>
                                            </div>
                                        </div>
                                        <div class="flex justify-between">
                                            <img class="h-6 w-6" src="/iconos/speed.svg" alt="" />
                                            <div class="place-self-start mr-28">
                                                <h1>Viaje mas corto</h1>
                                            </div>
                                            <div>
                                                <Button filtro="viaje" on:click={() => {buttonClick('viaje')}}/>
                                            </div>
                                        </div>
                                        <div class="flex justify-between">
                                            <img
                                                class="h-6 w-6"
                                                src="https://icon-library.com/images/icon-coins/icon-coins-3.jpg"
                                                alt=""
                                            />
                                            <div class="place-self-start mr-28">
                                                <h1>Precio mas bajo</h1>
                                            </div>
                                            <div>
                                                <Button filtro="precio" on:click={() => {buttonClick('precio')}}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-12">
                                        <h1 class="text-xl font-normal">Por tu flota favorita</h1>
                                        <div class="ml-1 mt-3">
                                            <input class="border-none outline-none" type="text" placeholder="Buscar" />
                                            <div class="h-px w-40 bg-black" />
                                        </div>
                                        <div class="grid grid-cols-1 mt-5">
                                            <div class="flex flex-wrap">
                                                {#each unique_nombres_flotas as nombre }
                                                    <FlotaTag name={nombre} />
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
		</div>
	</div>
{:else}

    <button
        class="fixed bottom-5 left-36 w-20 h-10 bg-blue-bus text-white font-gt rounded-2xl"
        on:click={handleClick}
    >
        filtro
    </button>
{/if}