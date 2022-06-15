<script>
    import {fade} from 'svelte/transition';
    import Box from '$lib/components/payment/box.svelte';
    import { factura } from '$store/store';
    import { createEventDispatcher } from 'svelte';

    let errors = { name:'', number:''};
    let valid = false;

    let dispatch = createEventDispatcher();

    const submitHandler = () => { 
        valid = true;

        if ($factura.name.trim().length < 10) {
            valid = false;
            errors.name = 'Ingresa el Nombre completo'
        } else {
            errors.name = '';
        }

        if ($factura.number.trim().length < 4) {
            valid = false;
            errors.number = 'Ingresa el NIT / CI';
        } else {
            errors.number = '';
        };

        if(valid){
            console.log('true');
            dispatch('valid');
        }
    }

    $: console.log($factura)
</script>


<Box>
    <form  class="w-full max-w-sm font-mn" on:submit|preventDefault={submitHandler} >
        <div in:fade="{{ duration: 550 }}">
            <div class="mb-8">
                <h1 class="font-semibold text-center xs:text-lg">Datos de Factura</h1>
            </div>
            <div class="text-sm xss:text-base space-y-1">
                <h1 class="text-[#000000A1]">Nombre Completo</h1>
                <div class="flex items-center border-b border-teal-500 py-2">
                    <input bind:value={$factura.name} class="appearance-none bg-transparent border-none w-full text-black mr-3 py-1 leading-tight focus:outline-none" type="text" aria-label="Full name">
                </div>
                <h1 class="font-light text-red-500 text-xs">{errors.name}</h1>
                <h1 class="text-[#000000A1] pt-2">NIT / C.I</h1>
                <div class="flex items-center border-b border-teal-500 py-2">
                    <input bind:value={$factura.number} class="appearance-none bg-transparent border-none w-full text-black mr-3 py-1 leading-tight focus:outline-none" type="text"  aria-label="Full name">
                </div>
                <h1 class="font-light text-red-500 text-xs">{errors.number}</h1>
            </div>
        </div>
    </form>
</Box>

<div class="fixed bottom-6 inset-x-0 mx-6">
    <button type="submit" on:click={() => submitHandler()} class="rounded-lg bg-black h-14 w-full text-white self-center">
        <span class="antialiased font-gt font-semibold text-lg">continuar</span>
    </button>
</div>