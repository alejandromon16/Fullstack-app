<script>
	import { getContext } from 'svelte';
	import ResultCard from '$lib/components/resultCard/ResultCard.svelte';
	import Filtro from '$lib/components/filtro.svelte';
	import { data, allFiltros, client } from '$store/store';
	import { onMount } from 'svelte';
	import { fade, fly, slide, scale} from 'svelte/transition';
	import { quadIn } from 'svelte/easing';
	import { goto } from '$app/navigation';
	import { searchCardDate } from '../../store/funciones';
	import { differenceTime2 } from '../../store/funciones';
	import { Jumper } from 'svelte-loading-spinners';
	import Locations from '$lib/components/resultCard/information.svelte';
	import fadeScale from '$lib/Transitions/results';
	import { cubicInOut } from 'svelte/easing';
	import { valid } from '$store/config';
	import { getJourneys } from '$store/queries/get/search';

	console.log('this is avalua:', $data.origen.id);
	const origenId = $data.origen.id;
	const destinoId = $data.destino.id;
	let isPageLoaded = false;
	const delay = 800;
	let i = 1;
	let ciclo = false;
	let travelJourneys; let travelJourneysFilter = [];
	let origen, destino, limit;
	

    const journeys = async () => {
		console.log('holaaaa')
        const res = await client.query(getJourneys(origenId, destinoId)).toPromise();
        travelJourneys = res.data.journeys;
		limit = travelJourneys.length;
		let i = 1;
		let ciclo = false;
    };

	journeys();
	
    
	$: {
		if($data){
			origen = $data.origen.name;
			destino = $data.destino.name;
			
		}
	}


	onMount(() => {
		if(!$valid){
			goto('/');
		}
		allFiltros.set([{orderby:"nada"},]);
		setTimeout(() => {
			isPageLoaded = true;
		}, 2000);
		setTimeout(() => {
			
			const limitedInterval = setInterval(() => {
				console.log(travelJourneys[i - 1])
				travelJourneysFilter[i - 1] = travelJourneys[i - 1];
				console.log(travelJourneysFilter)
				i++;
				if (i > limit) {
					ciclo = true
					clearInterval(limitedInterval);
				}
			}, 900);
		}, 600);
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

	const handleClick = (id) => {
		console.log('clkc')
		console.log(id)
		 goto(`/resultados/${id}`);
	};

</script>

{#if isPageLoaded}
	<div in:fade={{delay:500, duration: 900}}	class="fixed top-0">
		<div>
			<img class="w-screen h-auto" src="iconos/cocha.svg" alt="">
		</div>
	</div>
	<div in:fade={{ duration: 700, delay:200 }}>
		<div in:fadeScale={{
			delay: 210,
			duration: 700,
			easing: cubicInOut,
			baseScale: 0.15
		}} >
			<div class="fixed top-0 h-[40vh] w-screen bg-gradient-to-b from-[#7A2EF8] to-[#E3BCBC] transform opacity-70">
				<div class="absolute ml-4 mt-5 mb-4">
					<button on:click={() => goto('/')}>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
						</svg>
					</button>
				</div>
				<div in:fade={{duration:100, delay:300}}> <Locations {origen} {destino}/></div>
			</div>
		</div>

		<div in:fade={{duration:400, delay:40}} class="fixed top-[100px]">
			<img class="h-screen w-screen" src="iconos/Rectangle 3.svg" alt="">
		</div>
	

		<div class="fixed top-40 bottom-0 inset-x-0">
			<div class="relative">
				<div class="grid grid-cols-1 absolute space-y-10 h-screen w-screen overflow-auto overscroll-auto pb-[70vh]">
					{#if travelJourneys.length > 0}
						{#each travelJourneysFilter as journey (journey._id)}
								<div in:fade={{ duration: 300, delay:1300 }} class="mx-4">
									<ResultCard {journey} on:click={() => handleClick(journey._id)} />
								</div>
						{/each}
					{:else}
							<img class="h-auto w-full" src="https://static.wixstatic.com/media/c6ba6c_377676e7db5c4b58ac33dfe0f985bfe0~mv2.gif" alt="">
					{/if}
					
						<!-- <div in:fade={{ duration: 300, delay:1000 }} class="mx-4"><ResultCard /></div>
						<div in:fade={{ duration: 300, delay:1300 }} class="mx-4"><ResultCard /></div>
						<div in:fade={{ duration: 300, delay:1600 }} class="mx-4"><ResultCard /></div>
						<div class="mx-5 pt-10">
							<h1 class="mx-2 font-bold">Terminos y condiciones</h1>
							<p class="mx-3">Nuestro terminos y condiciones son los siguientes:
								-no somos responsable por perdidas en los buses
								Nuestro terminos y condiciones son los siguientes:
								-no somos responsable por perdidas en los buses
								Nuestro terminos y condiciones son los siguientes:
								-no somos responsable por perdidas en los buses
								Nuestro terminos y condiciones son los siguientes:
								-no somos responsable por perdidas en los buses
							</p>
						</div> -->
				</div>
			</div>
		</div>
	</div>

{:else}
	<div class="grid grid-cols-1 h-screen w-screen justify-items-center content-center">
		<div out:fade={{duration:200}} class="mb-20">
			<h1 class="font-bold animate-pulse">Buscando ofertas</h1>
		</div>
		<div out:fly="{{y:-400, duration:600}}" class="pb-80">
			<Jumper size="60" color="#7A2EF8" unit="px" duration="1s" ></Jumper>
		</div>
	</div>
{/if}

	



