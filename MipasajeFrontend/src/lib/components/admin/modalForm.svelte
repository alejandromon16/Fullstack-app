<script>
    import { toggleModal } from '$store/config';
    import { fade } from 'svelte/transition';
    import { goto } from '$app/navigation';


    let fields = {
        name: '',
        lastname: '',
        phoneNumber: ''

    }
    
    const submit = () => {
        toggleModal()
        goto('/admin/cliente/')
    }
</script>

<div transition:fade="{{duration:300}}" class="relative w-[25vw] bg-white rounded-lg shadow dark:bg-gray-700 font-gt"on:click-outside={toggleModal}>
    <div class="flex justify-end p-2">
        <button type="button" on:click={toggleModal} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
        </button>
    </div>
    <div class="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8">
        <h3 class="text-xl font-bold  text-gray-900 dark:text-white">Reserva de Asientos</h3>
        <div>
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nombre</label>
            <input class="bg-[#f1f2f6] outline-none border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  required oninvalid="this.setCustomValidity('Por favor Ingresa el nombre')">
        </div>
        <div>
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Apellidos</label>
            <input class="bg-[#f1f2f6] outline-none border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required oninvalid="this.setCustomValidity('Por favor Ingresa los apellidos')">
        </div>
        <div>
            <label for="numbers" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Celular</label>
            <input class="bg-[#f1f2f6] outline-none border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required oninvalid="this.setCustomValidity('Por favor Ingresa el Celular')">
        </div>
        <div class="mb-10">
            <label for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Carnet identidad</label>
            <input class="bg-[#f1f2f6] outline-none border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required oninvalid="this.setCustomValidity('Por favor Ingresa el Carnet')">
        </div>
        <button on:click={() => submit()} class="bg-blue-600 hover:bg-[#08c2c2] text-white font-bold py-3 rounded shadow-lg hover:shadow-xl transition duration-200 w-full">Guardar</button>
    </div>
</div>