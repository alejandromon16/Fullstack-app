<script context="module" lang="ts">

  import { api } from "$lib/utils/api";
  import { getUsersByRole } from '$store/queries/get/search';

  export async function load({params, session, stuff}){

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
        clients:res,
        userRole: stuff.role
      }
    }
  }
</script>

<script>
    import { goto } from '$app/navigation';
    import {fade} from 'svelte/transition'; 
    import { addBus } from '$store/queries/create/all';
    import Select from 'svelte-select';

    export let clients;
    export let userRole;
    console.log('user pagina',userRole);
    let bus = { model: '', seatsUpstairs:'', seatsDownstairs: '', seatType: '' };
    let errors = { model: '', seatsUpstairs:'', seatsDownstairs: '', seatType: '' }
    let valid = false;
    let clientID
    let placeHolder = 'selecciona'
  
    function onChange(event) {
      bus.seatType = event.currentTarget.value;
    }

    const submitHandler = async () => { 
      console.log('clickkk')
        valid = true;
        bus.seatsDownstairs = parseInt(bus.seatsDownstairs)
        bus.seatsUpstairs = parseInt(bus.seatsUpstairs)

        if(bus.model.trim().length < 3) {
            valid = false; 
            errors.model = 'Ingresa tu Nombre cde modelo valido'
        } else {
            errors.model = '';
        }

        if (bus.seatsDownstairs <= 0) {
            valid = false;
            errors.seatsDownstairs = 'numeros mal'
        } else {
            errors.seatsDownstairs = '';
        };

        if (bus.seatsUpstairs <= 0) {
            valid = false;
            errors.seatsUpstairs = 'Iasientos mal'
        } else {
            errors.seatsUpstairs = '';
        };

        if(valid){
          const { data: { addBus : res}} = await api(addBus(userID, bus.model, bus.seatsDownstairs, bus.seatsUpstairs, bus.seatType));
          if(res){
            goto('/admin/cliente/buses')
          }else{
            //notificacion
          }
          
        }
    }

    $: userID = clientID

    const handleSelect = async (event) => {
      console.log('selected item', event.detail);
      clientID = event.detail.value
    }

    let list = []
    let imgSrc

    const widgetCloudinary = cloudinary.createUploadWidget({
        cloudName: 'dvklesox1',
        uploadPreset: 'miPasaje',
    }, (err, result) => {
        if(!err && result && result.event === 'success'){
            console.log('imagen subida',result.info)
            imgSrc = result.info.secure_url
            console.log(result.event)
            list = [...list, result.info.secure_url]
        }
    });

    const files = () => {
        widgetCloudinary.open()
    }



</script>

<main in:fade="{{duration:300}}" class="h-full pb-16 overflow-y-auto">
    <div class="container px-40 mx-auto grid">

      <h2 class="my-6 ml-14 text-2xl font-semibold text-gray-700 dark:text-gray-200">Crear bus</h2>
  
      <!-- General elements -->
      <div class="px-20 py-5 pb-14 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 space-y-6">
        {#if userRole == "ADMIN" || userRole == "SUPER_ADMIN"}
          <div class="grid grid-cols-2 py-2">
            <div class="xl:pr-48">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Clientes</label>
              <Select  {placeHolder} items={clients} on:select={handleSelect} isClearable={false} />
            </div>
          </div>
        {/if}
        <div>
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Modelo</label>
            <input bind:value={bus.model} class="bg-[#f1f2f6] outline-none border  border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  required oninvalid="this.setCustomValidity('Por favor Ingresa el nombre')">
        </div>
        <div>
            <label for="numbers" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Asientos abajo</label>
            <input bind:value={bus.seatsDownstairs} class="bg-[#f1f2f6] outline-none border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required oninvalid="this.setCustomValidity('Por favor Ingresa el Celular')">
        </div>
        <div class="mb-5">
            <label for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Asientos arriba</label>
            <input bind:value={bus.seatsUpstairs} class="bg-[#f1f2f6] outline-none border  border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required oninvalid="this.setCustomValidity('Por favor Ingresa el Carnet')">
        </div>
        <div class="mt-4 text-sm">
          <span class="text-sm font-medium text-gray-900 dark:text-gray-300"> Tipo de Asiento </span>
          <div class="mt-3">
            <label class="inline-flex items-center text-gray-600 dark:text-gray-400">
              <input
                on:change={onChange}
                type="radio"
                class="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                name="accountType"
                value="Normal"
              />
              <span class="ml-2">Normal</span>
            </label>
            <label class="inline-flex items-center ml-6 text-gray-600 dark:text-gray-400">
              <input
                 on:change={onChange}
                type="radio"
                class="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                name="accountType"
                value="Semicama"
              />
              <span class="ml-2">Semicama</span>
            </label>
            <label class="inline-flex items-center ml-6 text-gray-600 dark:text-gray-400">
                <input
                   on:change={onChange}
                  type="radio"
                  class="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                  name="accountType"
                  value="Cama"
                />
                <span class="ml-2">Cama</span>
              </label>
          </div>
        </div>

        <div class="mt-5">
          <button on:click={() => files()} class="rounded-lg bg-blue-500 h-10 w-auto px-3 text-white">Agregar imagenes</button>
        </div>

         <div class="flex justify-end">
             <div class="mt-3">
                 <button on:click={() => submitHandler()} class="bg-purple-700 rounded-md font-medium text-sm h-8 w-full text-white px-3"> Crear bus</button>
             </div>
         </div>
  
    </div>
  </main>