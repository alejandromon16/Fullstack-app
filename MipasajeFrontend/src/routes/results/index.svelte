<script context="module">
	import { get } from 'svelte/store';
	import { fetch } from '../../store/graphql';
	import { getSearchBuses } from '../../store/queries/get/Bus';
	import { allFiltros } from '../../store/store';

	export async function load() {
		//console.log(get(data));
		//const horaBusqueda = getTime(30).toISOString;
		//const { buses } = await fetchData(getSearch(horaBusqueda, info.origen, info.destino ));
		//for now i do not need a specific time of search, any answer is good.
		const  buses  = await fetch(getSearchBuses());
		console.log(buses);
		return {
			props: {
				buses
			}
		};
	}
</script>

<script>
	import ResultCard from '$lib/components/resultsCard.svelte';
	import Filtro from '$lib/components/filtro.svelte';
	import { data } from '../../store/store';
	import { onMount } from 'svelte';
	import { fade, fly, slide } from 'svelte/transition';
	import { quadIn } from 'svelte/easing';
	import { goto } from '$app/navigation';
	import { searchCardDate } from '../../store/funciones';
	import { differenceTime2 } from '../../store/funciones';

	let isPageLoaded = false;
	export let buses;
	const almacen = [...buses]
	console.log(almacen);
	let allBuses = new Array();

	const delay = 800;
	const limit = buses.length;
	let i = 1;
	let ciclo = false
	setTimeout(() => {
		allBuses[0] = buses[0];
		const limitedInterval = setInterval(() => {
			allBusesFilter[i - 1] = buses[i - 1];
			i++;
			if (i > limit) {
				ciclo = true
				clearInterval(limitedInterval);
			}
		}, 500);
	}, 900);

	onMount(() => {
		allFiltros.set([{orderby:"nada"},]);
		setTimeout(() => {
			isPageLoaded = true;
		}, 1500);
	});
	

	const handleFiltros = (filtro) => {
		if ($allFiltros.includes(filtro)) {
			$allFiltros = $allFiltros.filter((e) => e !== filtro);
		}else {
			$allFiltros = [...$allFiltros, filtro];
		}
	};

	const handleEvent = (e) => {
		if($allFiltros[0].orderby == e.detail.Filtro){
            $allFiltros[0].orderby = 'nada';
		}else{
			switch(e.detail.Filtro) {
				case 'viaje':
					$allFiltros[0].orderby = e.detail.Filtro;
					allBusesFilter = [...allBusesFilter.sort((a, b) => (differenceTime2(a.horario.salida,a.horario.llegada) > differenceTime2(b.horario.salida,b.horario.llegada) ? 1 : -1))];
					saver = [...saver.sort((a, b) => (differenceTime2(a.horario.salida,a.horario.llegada) > differenceTime2(b.horario.salida,b.horario.llegada) ? 1 : -1))];
					break;
				case 'precio':
					$allFiltros[0].orderby = e.detail.Filtro;
					allBusesFilter = [...allBusesFilter.sort((a, b) => (a.precio > b.precio ? 1 : -1))];
					saver = [...saver.sort((a, b) => (a.precio > b.precio ? 1 : -1))];
					break;
				case 'salida':
					$allFiltros[0].orderby = e.detail.Filtro;
					allBusesFilter = [...allBusesFilter.sort((a, b) => (a.horario.salida > b.horario.salida ? 1 : -1))];
					saver = [...saver.sort((a, b) => (a.horario.salida > b.horario.salida ? 1 : -1))];
					break;
				default:
					handleFiltros(e.detail.Filtro.toLowerCase());
					break;
			}
		}
	};

	const handleClick = () => {
		goto('/');
	};

	let allBusesFilter = new Array();
	let saver = new Array();
	saver = [...allBusesFilter]

	$: {
		if($allFiltros.length > 1){
			console.log(allBusesFilter.length)
			saver = []
			for( let i = 0 ; i < allBusesFilter.length; i++){
				let ruta = allBusesFilter[i].tipoDeAsiento.toLowerCase();
				console.log(ruta)
				let res = $allFiltros.includes(ruta)
				console.log(res);

				if(res){
					saver = [...saver, allBusesFilter[i]]
				}
				console.log('this is saver',saver)
			}
		}else if($allFiltros[0].orderby.includes('nada')){
			console.log(('nada'))
			if(ciclo){
				
				allBusesFilter = [...almacen];
				console.log(allBusesFilter)
			}
			
		}
	};

</script>


	


{#if isPageLoaded}
	<div
		in:fade={{ duration: 200 }}
		class="h-14 w-full fixed top-0 inset-0 z-40 bg-blue-bus lg:hidden shadow-lg"
	>
		<div class="relative">
			<div class="absolute ml-4 mt-3">
				<button on:click={handleClick}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="#A1A9C3"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>
			</div>
		</div>

		<div class="flex w-full">
			<div class="mx-auto mt-1">
				<div class="flex w-full font-gt text-white font-semibold text-base">
					<div>
						<h1>Santa Cruz</h1>
					</div>
					<div class="mt-0.5">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							viewBox="0 0 20 20"
							fill="white"
						>
							<path
								fill-rule="evenodd"
								d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
					<div>
						<h1>{$data.destino}</h1>
					</div>
				</div>
				<div>
					<h1 class="font-gt text-sm text-white text-center">{searchCardDate()}</h1>
				</div>
			</div>
		</div>
	</div>
	{#if almacen.length != 0}
		{#if almacen.length > 2}
			<div class="h-screen w-full bg-gray-200 z-10">
				<div in:fade={{ duration: 500 }} class="bg-gray-200 h-full w-full pb-10 z-20">
					<div class="pt-20 ml-4">
						<span in:fade={{ duration: 500 }} class="font-gt font-bold text-blue-bus text-2xl">
							Selecciona salida
						</span>
					</div>
					<div />
					<div class="px-4 mt-3 bg-gray-200 h-full" id="results">
						{#if $allFiltros.length > 1}
							{#each saver as bus, i}
								<a href="/results/{bus.id}" class="">
									<ResultCard datos={bus} />
								</a>
							{/each}
						{:else}
							{#each allBusesFilter as bus, i}
								<a href="/results/{bus.id}" class="">
									<ResultCard datos={bus} />
								</a>
							{/each}
						{/if}
					</div>
				</div>
			</div>
		{:else}
			<div in:fade={{ duration: 500 }} class="bg-gray-200 h-screen pb-20">
				<div class="pt-20 ml-4">
					<span in:fade={{ duration: 500 }} class="font-gt font-bold text-blue-bus text-2xl">
						Selecciona salida
					</span>
				</div>
				<div />
				<div class="mx-4 mt-3" id="results">
					{#each allBuses as bus, i}
						<a href="/results/{bus.id}">
							<ResultCard datos={bus} />
						</a>
					{/each}
				</div>
			</div>
		{/if}
		<Filtro flotas={buses} on:filtro={(e) => {handleEvent(e)}} />
	{:else}
		<div in:fade={{ duration: 500 }} class="flex h-screen bg-gray-200">
			<div class="mt-5 mx-auto">
				<div class="pt-20">
					<span
						in:fade={{ duration: 500 }}
						class="mx-4 pl-px font-gt font-bold text-blue-bus text-2xl"
					>
						Lo sentimos!
					</span>
				</div>
				<div class="mx-5 mt-3">
					<h1 class="font-gt text-black font-light">
						No se han encontrados ofertas para esta ruta.
					</h1>
				</div>
				<div class="mt-10">
					<img
						in:fade={{ duration: 500 }}
						src="https://www.gifsanimados.org/data/media/425/autobus-imagen-animada-0029.gif"
						alt=""
					/>
				</div>
			</div>
		</div>
	{/if}
{:else}
	<div class="grid grid-cols-1 place-content-center fixed inset-0 bg-white">
		<img
			transition:fade={{ duration: 400 }}
			src="/iconos/loading2.gif"
			class="mx-auto h-20 w-20"
			alt=""
		/>
	</div>
{/if}


