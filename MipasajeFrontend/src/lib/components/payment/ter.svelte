<script>
    import Box from './box.svelte';
    import { fade } from 'svelte/transition';
    import { Circle } from 'svelte-loading-spinners';
    import { goto } from '$app/navigation';

    let processingPayment = false

    const handlePayment = () => {
        processingPayment = true;
        setTimeout(() =>{
            goto('/checkout/success');
        },2500)
    }
</script>

<div class="transition ease-in-out delay-100 duration-400 {processingPayment ? 'fixed inset-0 bg-gray-700 opacity-60': ''}"/>
<Box>
    <form class="w-full max-w-sm font-mn">
        <div class="mb-8">
            <h1 class="font-semibold text-center xs:text-lg">Detalle de Pago</h1>
        </div>
        <div class="text-sm xss:text-base space-y-1">
            <h1 class="text-[#000000A1]">Nombre Completo</h1>
            <div class="flex items-center border-b border-teal-500 py-2">
            <input class="appearance-none bg-transparent border-none w-full text-black mr-3 py-1 leading-tight focus:outline-none" type="text"  aria-label="Full name">
            </div>
            <h1 class="text-[#000000A1] pt-2">Numero de Tarjeta</h1>
            <div class="flex items-center border-b border-teal-500 py-2">
                <input class="appearance-none bg-transparent border-none w-full text-black mr-3 py-1 leading-tight focus:outline-none" type="text"  aria-label="Full name">
            </div>
            
            <div class="flex justify-between">
                <div class="w-3/4 pr-8">
                    <h1 class="text-[#000000A1] pt-2">Fecha de expiracion</h1>
                    <div class="flex items-center border-b border-teal-500 py-2">
                        <input class="appearance-none bg-transparent border-none w-full text-black font-normal mr-3 py-1  leading-tight focus:outline-none" type="text" aria-label="Full name">
                    </div>
                </div>
                <div class="w-1/4">
                    <h1 class="text-[#000000A1] pt-2">CVV</h1>
                    <div class="flex items-center border-b border-teal-500 py-2">
                        <input class="appearance-none bg-transparent border-none w-full text-black font-normal mr-3 py-1  leading-tight focus:outline-none" type="number" placeholder="****" aria-label="Full name">
                    </div>
                </div>
            </div>
        </div>
    </form>
</Box>

<div class="fixed bottom-6 inset-x-0 mx-6">
    <button type="submit" on:click={() => handlePayment()} class="rounded-lg bg-black h-14 w-full grid place-content-center text-white self-center">
        {#if processingPayment}
            <div in:fade={{duration:400}}>
                <Circle size="25" color="#7A2EF8" unit="px" duration="1s" />
            </div>
            
        {:else}
            <span class="antialiased font-gt font-semibold text-lg">Proceder a pagar</span>
        {/if}
    </button>
</div>