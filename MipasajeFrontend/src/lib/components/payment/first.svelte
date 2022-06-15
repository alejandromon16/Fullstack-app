<script>
    import Button from '$lib/ui/button.svelte';
    import {fade} from 'svelte/transition';
    import { pasajero } from '$store/store';
    import { createEventDispatcher } from 'svelte';
    import Box from '$lib/components/payment/box.svelte';

    let errors = { name:'', ci: '', phone: ''};
    let valid = false;

    let dispatch = createEventDispatcher();

    const submitHandler = () => { 
        valid = true;

        if ($pasajero.name.trim().length < 10) {
            valid = false;
            errors.name = 'Ingresa tu Nombre completo'
        } else {
            errors.name = '';
        }

        if ($pasajero.ci.trim().length < 4) {
            valid = false;
            errors.ci = 'Ingresa tu Carnet'
        } else {
            errors.ci = '';
        };

        if ($pasajero.phone.trim().length < 8) {
            valid = false;
            errors.phone = 'Ingresa tu Celular'
        } else {
            errors.phone = '';
        };
        if(valid){
            console.log('true');
            dispatch('valid');
        }
    }

    $: console.log($pasajero)
            
</script>

<Box>
    <form class="w-full max-w-sm font-mn" on:submit|preventDefault={submitHandler} >
        <div in:fade="{{ duration: 600 }}">
            <div class="mb-8">
                <h1 class="font-semibold text-center xs:text-lg">Datos de los pasajeros</h1>
            </div>
            <div class="text-sm xss:text-base space-y-1">
                <h1 class="text-[#000000A1]">Nombre Completo</h1>
                <div class="flex items-center border-b border-teal-500 py-2">
                
                    <input bind:value={$pasajero.name} class="appearance-none bg-transparent border-none w-full text-black mr-3 py-1 leading-tight focus:outline-none" type="text" aria-label="Full name">
                </div>
                <h1 class="font-light text-red-500 text-xs">{errors.name}</h1>
                <h1 class="text-[#000000A1] pt-2">C.I</h1>
                <div class="flex items-center border-b border-teal-500 py-2">
                    <input bind:value={$pasajero.ci} class="appearance-none bg-transparent border-none w-full text-black mr-3 py-1 leading-tight focus:outline-none" type="text"  aria-label="Full name">
                </div>
                <h1 class="font-light text-red-500 text-xs">{errors.ci}</h1>
                <h1 class="text-[#000000A1] pt-2">Celular</h1>
                <div class="flex items-center border-b border-teal-500 py-2">
                    <input bind:value={$pasajero.phone} class="appearance-none bg-transparent border-none w-full text-black font-normal mr-3 py-1  leading-tight focus:outline-none" type="text" aria-label="Full name">
                </div>
                <h1 class="font-light text-red-500 text-xs">{errors.phone}</h1>
            </div>
        </div>  
    </form>
</Box>

<div class="fixed bottom-[25px] inset-x-0 mx-6">
    <button type="submit" class="rounded-lg bg-black h-14 w-full text-white self-center" on:click={submitHandler}>
        <span class="antialiased font-gt font-semibold text-lg">continuar</span>
    </button>
</div>
    

