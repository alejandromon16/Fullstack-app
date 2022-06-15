<script>
    import { isDark, toggleModalLocations, destinoSelect } from '$store/config';
    import {fade} from 'svelte/transition';
    import Card from '$lib/components/admin/card.svelte';
    import { getOriginsByClient, getDestinationsByClient } from '$store/queries/get/search';
    import { onMount } from 'svelte';
    import { routeSelections } from '$store/store';
    import Box from '$lib/components/seleccion/valores.svelte';
    import Button from '$lib/ui/button.svelte';
    import { goto } from '$app/navigation';
    import { api } from '$lib/utils/api';
    import { getCookieItem } from '$lib/utils/auth';
    import { sorting } from '$lib/utils/commons';


    let rutasPage = true;
    let origenes = [];
    let destinos = [];

    $: origins = [...origenes]
    $: destinations = [...destinos]

    const userID = (async() => {
      return await getCookieItem('user')
    })

    const getOrigins = async () => {
      const { data: {routes : res} } = await api(getOriginsByClient(await userID()))
      origenes = unique(res, 'origin')
    }

    const unique = (v, key) => {
      let res = [...new Map(v.map(item => [item[key]['name'], item])).values()];
      res = res.map(item => item[key]);
      return sorting(res, 'name')
    }

    const getDestinations = async () => {
      const { data : { routes : res }} = await api(getDestinationsByClient(await userID(), $routeSelections.origin.id))
      destinos = unique(res, 'destination')
    }

    const setRouteSelection = () => {
      routeSelections.set({ 
          reload: false,
          option: false,
          origin:{
              boxId : " ",
              id : " ",
              name: " "
          },
          destination:{
              boxId : " ",
              id : " ",
              name: " "
          }
      });
    }

    onMount(async () => {
      setRouteSelection()
      await getOrigins()
    });

    let show = false;
    let destinosShow = [];
    const handleClick = async (locationType, id, boxId) => {

      if( locationType == 'origin'){
        if($routeSelections.origin.id == id) {
          $routeSelections.origin.boxId = " ";
          $routeSelections.origin.id = " ";
          
          show = false;
        }else{
          $routeSelections.origin.id = id;
          $routeSelections.origin.boxId = boxId;
          show = true;
          await getDestinations()
        }

        $routeSelections.destination.boxId = " ";
        $routeSelections.destination.id = " ";
      }

      if( locationType == 'destination'){
        if($routeSelections.destination.id == id){
          $routeSelections.destination.boxId = " ";
          $routeSelections.destination.id = " ";
        }else{
          $routeSelections.destination.id = id;
          $routeSelections.destination.boxId = id;
        }  
      }

      
    }

    const checker = (option) => {
      if(option == 'destination' && $routeSelections.origin.id.length > 2){
        $routeSelections.option = true;
        toggleModalLocations();
      }else if(option == 'origin'){
        show = false;
        $routeSelections.origin.boxId = " ";
        $routeSelections.origin.id = " ";
        $routeSelections.option = false;
        toggleModalLocations();
      }
      $routeSelections.destination.id = " ";
      $routeSelections.destination.boxId = " ";

    };

    const randomKey = () => {
      return Math.random();
    }

    $:{
      if($routeSelections.reload){
        // let temp = $routeSelections.origin.id
        // let temp2 = $routeSelections.origin.boxId
        // handleClick('origin', $routeSelections.origin.id, $routeSelections.origin.boxId);
        // handleClick('origin', temp, temp2)
        $routeSelections.reload = false;
        getOrigins()
        if($routeSelections.option){
          getDestinations()
        }
      }
    }

</script>

{#if $routeSelections.origin.id.length > 2 && $routeSelections.destination.id.length > 2}
  <Box>
      <Button on:click={() => goto(`/admin/cliente/ofertas/${$routeSelections.origin.id}_${$routeSelections.destination.id}`)} text="Crear oferta" color="bg-[#08c2c2]"/>
  </Box>

{/if}


<div class="h-fit w-full overflow-y-visible {$isDark? '':'bg-gray-100'} pb-10" in:fade="{{duration:200}}" >
    <div class="container px-6 mx-auto grid">
        <div>
            <div class="flex justify-between">
              <div class="ml-2">
                  <h2 class="my-6 text-xl font-bold text-gray-700 dark:text-gray-200">Origen</h2>
              </div>
              <div class="self-center pr-2">
                  <button class="h-7 w-full px-4 bg-purple-600 font-medium  rounded-full text-white outline-none" on:click={() => {checker('origin')}}>+ Origen</button>
              </div>
          </div>
            <div class="grid grid-cols-4 gap-4">
              {#each origins as {_id, name} (_id)}
                      <Card lugar={name} id={randomKey()} on:seleccion={(e) => handleClick('origin',_id, e.detail.id)} {rutasPage} />
              {/each}
            </div>
          </div>
          <div>
            <div class="flex justify-between">
              <div class="ml-2">
                  <h2 class="my-6 text-xl font-bold text-black dark:text-gray-200">Destinos</h2>
              </div>
              <div class="self-center pr-2">
                  <button class="{$routeSelections.origin.id.length > 2 || [] ? 'bg-purple-600': 'bg-purple-400'} h-8 w-full px-4 font-medium  rounded-full text-white outline-none" on:click={() => {checker('destination')}}>+ Destino</button>
              </div>
          </div>
            <div class="grid grid-cols-4 gap-4" in:fade="{{duration:200}}">
              {#if show}
                {#each destinations as {_id, name} (_id)}
                  <Card lugar={name} id={_id} {rutasPage} on:click={() => handleClick('destination', _id)}/>
                {/each}
              {/if}
            </div>
          </div>
    </div>
  </div>