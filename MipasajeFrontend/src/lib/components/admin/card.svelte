<script>
    import { isDark } from '$store/config';
    import { createEventDispatcher } from 'svelte';
    import { goto } from '$app/navigation';
    import { fade } from 'svelte/transition';
    import fadeScale from '$lib/Transitions/results';
	  import { cubicInOut } from 'svelte/easing';
    import { routeSelections } from '$store/store';

    let show = false;
    let horarios = false
    export let selected = false;
    export let rutasPage = false;
    export let lugar
    export let id

    let dispatch = createEventDispatcher();

    const handleClick = () => {
      if(rutasPage){
        selected = !selected;
      }else{
        show = true;
      }
    }

    const gotoSeat = (id) => {
      goto(`/admin/cliente/${id}`)
      dispatch('horario',{
        id
      })
    }

    const click = () => {
      dispatch('seleccion',{
        id
      })
    }
</script>

{#if show }
  <div class="flex flex-col">
    <button on:click={() => {show=false;horarios=false}} class="">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 dark:fill-neutral-50" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
      </svg>
    </button>
    {#if horarios}
      <div class="grid grid-cols-4">
        <button on:click={() => gotoSeat('ckz21sbk81f200b87yk16wxsp')} class="transform transition duration-300 hover:shadow-md flex w-fit items-center my-2 p-2 bg-white border-gray-50 border-2 dark:border-none hover:scale-105 rounded-lg shadow-xs dark:bg-gray-800">
          <div>
            <p class="mb-2 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
              16:45
            </p>
          </div>
        </button>
        <div class="transform transition duration-300 hover:shadow-md flex w-fit items-center my-2 p-2 bg-white border-gray-50 border-2 dark:border-none hover:scale-105 rounded-lg shadow-xs dark:bg-gray-800">
          <div>
            <p class="mb-2 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
              16:45
            </p>
          </div>
        </div>
        <div class="transform transition duration-300 hover:shadow-md flex w-fit items-center  my-2 p-2 bg-white border-gray-50 border-2 dark:border-none hover:scale-105 rounded-lg shadow-xs dark:bg-gray-800">
          <div>
            <p class="mb-2 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
              16:45
            </p>
          </div>
        </div>
        <div class="transform transition duration-300 hover:shadow-md flex w-fit items-center my-2 p-2 bg-white border-gray-50 border-2 dark:border-none hover:scale-105 rounded-lg shadow-xs dark:bg-gray-800">
          <div>
            <p class="mb-2 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
              16:45
            </p>
          </div>
        </div>
        <div class="transform transition duration-300 hover:shadow-md flex w-fit items-center my-2 p-2 bg-white border-gray-50 border-2 dark:border-none hover:scale-105 rounded-lg shadow-xs dark:bg-gray-800">
          <div>
            <p class="mb-2 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
              16:45
            </p>
          </div>
        </div>
        <div class="transform transition duration-300 hover:shadow-md flex w-fit items-center my-2 p-2 bg-white border-gray-50 border-2 dark:border-none hover:scale-105 rounded-lg shadow-xs dark:bg-gray-800">
          <div>
            <p class="mb-2 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
              16:45
            </p>
          </div>
        </div>
      </div>
    {:else}
    <div class="grid grid-cols-1 space-y-2">
      <button on:click={() => {horarios=true}} class="transform transition duration-300 hover:shadow-md flex items-center p-1 bg-white border-gray-50 border-2 dark:border-none hover:scale-105 rounded-lg shadow-xs dark:bg-gray-800">
        <div>
          <p class="mb-2 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
            Normal
          </p>
        </div>
      </button>
      <div class="transform transition duration-300 hover:shadow-md flex items-center p-1 bg-white border-gray-50 border-2 dark:border-none hover:scale-105 rounded-lg shadow-xs dark:bg-gray-800">
        <div>
          <p class="mb-2 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
            Semicama
          </p>
        </div>
      </div>
      <div class="transform transition duration-300 hover:shadow-md flex items-center p-1 bg-white border-gray-50 border-2 dark:border-none hover:scale-105 rounded-lg shadow-xs dark:bg-gray-800">
        <div>
          <p class="mb-2 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
            Cama
          </p>
        </div>
      </div>
    </div>
    {/if}
    
  </div>
  

{:else}
  <button in:fadeScale={{
    duration: 700,
    easing: cubicInOut,
    baseScale: 0.15
  }} on:click  on:click={() => click()} class="{($routeSelections.origin.boxId == id || $routeSelections.destination.boxId == id) ? 'bg-purple-500 text-white scale-105 ':'bg-white text-gray-600'} 
    {rutasPage ? '': 'hover:scale-110' } trasition duration-300 outline-none h-20 transform hover:shadow-md flex items-center p-4  border-gray-50 border-2 dark:border-none  rounded-lg shadow-xs dark:bg-gray-800">
    <div>
      <p class="mb-2 text-center text-sm font-medium  dark:text-gray-400">
        {lugar}
      </p>
    </div>
  </button>
{/if}