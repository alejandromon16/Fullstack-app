<script context="module" lang="ts">

  import { api } from "$lib/utils/api";
  import { getBusesByClientId, getUsersByRole, getRouteId } from '$store/queries/get/search';

  export async function load({params, stuff}){

    const destinationID = params.destino
    const originID = params.origen
    let res;

    if( stuff.role == 'SUPER_ADMIN' || stuff.role == 'ADMIN'){
        const { data: { usersByRole : ress }} = await api(getUsersByRole('CLIENT'))
        res = ress.map((user) => {
          return{
            value: user._id,
            label: user.name
          }
        })
    }

    return{
      props: {
        destinationID,
        originID,
        clients:res,
        userRole: stuff.role
      }
    }
  }
</script>

<script>
    import {fade} from 'svelte/transition';
    import DatePicker from '$lib/components/dateTime/dateRange.svelte';
    import Select from 'svelte-select';
    import {session} from '$app/stores';
    import { goto } from '$app/navigation'; 
    import { addJourney } from '$store/queries/create/all';

    export let destinationID;
    export let originID;
    export let clients;
    export let userRole

    let clientId
    let items
    let busID
    let rid

    $: busesItems = items
    $: routeId = rid

    const handleSelect = async (event) => {
      clientId = event.detail.value
      console.log(clientId)
      const {data : { buses : res }} = await api(getBusesByClientId(clientId))
      items = res.map((bus) => {
        return{
          value: bus._id,
          label: bus.model
        }
      })
      console.log(items)
      const { data : { routeGiveID : id}} = await api(getRouteId(clientId, originID, destinationID))
      rid = id
    }

    const handleSelectBus = (event) => {
      busID = event.detail.busID;
    }

    const handleChange = (event) => {
      console.log('cange',event.detail)
    }

    const createOfert = async (gotoOfertas=true) => {
      //completar
      const {data : res} = await api(addJourney(clientId,busID,))
       
    }

    const otraOferta = () => {
      //submitData
      //createOfert(false)
      location.reload()
    }
</script>

<main in:fade="{{duration:300}}" class="h-full pb-16 overflow-y-auto">
    <div class="container px-40 mx-auto grid">

      <h2 class="my-6 ml-14 text-2xl font-semibold text-gray-700 dark:text-gray-200">Crear Oferta</h2>
  
      <!-- General elements -->
      <div class="px-20 py-5 pb-14 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 space-y-6">
        <div class="grid grid-cols-2 py-6">
          <div class="xl:pr-48">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Salida</label>
            <DatePicker/>
          </div>
          <div class="xl:pr-48">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Llegada</label>
            <DatePicker/>
          </div>
        </div>
        <div>
          
        </div>
        {#if userRole == "ADMIN" || userRole == "SUPER_ADMIN"}
          <div class="grid grid-cols-2 py-6">
            <div class="xl:pr-48">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Clientes</label>
              <Select  items={clients} on:select={handleSelect} isClearable={false} isSearchable={true}/>
          </div>
          <div class="xl:pr-48">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Modelo</label>
              <Select items={busesItems} on:select={handleSelectBus} isClearable={false} isSearchable={true}></Select>
          </div>
          </div>
        {/if}
        
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Price</label>
          <div class="grid grid-cols-2">
            <input class="bg-[#f1f2f6] outline-none border  border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-22 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  required oninvalid="this.setCustomValidity('Por favor Ingresa el nombre')">
            <h1 class="mt-3 px-2">Bs</h1>
          </div>

        </div>

         <div class="flex justify-between mt-2 space-x-2">
            <div>
              <button on:click={() => createOfert()} class="bg-red-700 rounded-md font-medium text-sm h-8 w-full text-white px-3"> Cancelar</button>
            </div>
           <div class="flex space-x-3">
              <div>
                <button on:click={() => otraOferta()} class="bg-blue-500 rounded-md font-medium text-sm h-8 w-full text-white px-3"> Otra Oferta</button>
              </div>
              <div>
                  <button on:click={() => createOfert()} class="bg-purple-700 rounded-md font-medium text-sm h-8 w-full text-white px-3"> Crear Oferta</button>
              </div>
           </div>
         </div>
  
    </div>
  </main>