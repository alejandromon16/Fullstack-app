<script>
	import Options from './options.svelte';
	import Selector from './selector.svelte';
	import Button from '$lib/ui/button.svelte';
	import {searchCardDate} from '$store/funciones';
	import { isOptionsOpen, toggleOptions, valid } from '$store/config';
    import { data, type, locations } from '$store/store';
	import { goto } from '$app/navigation';
	import { api } from '$lib/utils/api';
	import { getDestinations } from '$store/queries/get/search';

	export let origins
	let destinations = []
	let errorSelector = { origen: false, destino: false};
	
	$: {
		if($data){
			errorSelector.origen = false;
			errorSelector.destino = false;
		}
		
	};

	let text = 'Buscar'
	let color = 'bg-black'
	let selectors = [

		{
			id: 1,
			type: 'Origen',
			icon: 'iconos/origen.svg',
            text: '' 
		},
		{
			id: 2,
			type: 'Destino',
			icon: 'iconos/destino.svg',
            text: ''
		},
		{
			id: 3,
			type: 'Fecha',
			icon: 'iconos/calendario.svg',
			text: searchCardDate()
		}
	];


	let icon;
	let Type;

	const handleClick = async (type, id) => {
		Type = type;
		var dmt = document.getElementById('content');
		dmt.classList.toggle('hidden');
		icon = selectors[id-1].icon;
		toggleOptions()
	}

	$:{
		if(Type){
			locations.set([])
			if(Type == 'Origen'){
				$type = 'Origen'
				$data.destino.id = ' '
           		$data.destino.name = ' '
				$locations = origins
			}else if(Type == 'Destino'){
				$type = 'Destino'
				 getDestinos($data.origen.id).then((v) => $locations = v);
				 
			}else{
				$type = 'Fecha';
			}
			Type = '';
		}
	}


    $: {
        if($data.origen){
            selectors[0].text = $data.origen.name;
        }
        if($data.destino){
            selectors[1].text = $data.destino.name;
        }
    };


	const searchRoute = () => {
		if ($data.origen.id && $data.destino.id){
			getRouteId( $data.origen.id, $data.destino)
		}
	};

	const getDestinos = async (id) => {
		const { data : { destinations: res}} = await api(getDestinations(id));
		return res;
	}

	let error
	const check = () => {
		$valid = true;

		if( $data.origen.id.length <= 1){
			errorSelector.origen = true;
			$valid = false
		}

		if( $data.destino.id.length <= 1){
			errorSelector.destino = true;
			$valid = false
		}

		if($valid){
			console.log('listo para mover')
			goto('/resultados')
		}


	};

</script>

{#if $isOptionsOpen}
	<Options {icon} />
{/if}

<div class="grid grid-cols-1 space-y-3 mx-4 mb-3 ">
		{#each selectors as {type, icon, id, text} (id)}
			<div>
                <Selector {icon} {text} {type} {errorSelector} on:click={() => {handleClick(type,id)}}/>
			</div>
		{/each}
</div>
<div class="mx-3 pt-2">
	<Button {text} {color} on:click={() => check()}/>
</div>

	

