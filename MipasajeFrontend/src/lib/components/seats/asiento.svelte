<script>
    import { createEventDispatcher } from 'svelte';
    import { asientos } from '$store/store';

    let dispatch = createEventDispatcher();
    export let id
    export let num
    export let ocupado = false
    export let selection = false
    export let floor;
   
    let casilla = [2,5,8,11,14,17,20,23,26,29];

    const handleClick = (id) => {
        if(!ocupado) {
            dispatch('seleccion',{
              ID : id
             });
        }     
    };

    let identifier = `${floor}-${num}`;
    
</script>

<div class="font-gt text-black text-lg">
    {#if casilla.includes(num)}
        <button id={num} class="{ selection ? 'scale-110 bg-[#f6c203]' : '' } { ocupado ? 'bg-[#8769DD]': ''} flex place-content-center items-center transform transition duration-200 ease-in-out h-14 w-14 rounded-[10px] shadow-md text-center ml-3 mr-20" on:click={() => handleClick(identifier)}>
            {#if ocupado}
                <div>
                    <img class="h-5 w-5" src="/iconos/icon.svg" alt="">
                </div>
            {:else}
                {#if selection}
                    <div>
                        <svg class="mx-auto h-6 w-6 " width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 5l-5.79 5.782a.745.745 0 0 1-1.052 0L3 7.628" stroke="black" stroke-width="2" stroke-linejoin="round"></path></svg>
                    </div>  
                {:else}
                    <h1 class="font-medium">{num}</h1>
                {/if}
            {/if}
            
        </button>
    {:else}
        {#if num==1}
            <button class="{ selection ? 'scale-110 bg-[#f6c203]' : '' } { ocupado ? 'bg-[#8769DD]': ''} flex place-content-center items-center transform transition duration-200 ease-in-out h-14 w-14 rounded-[10px] shadow-md text-center mt-4" on:click={() => handleClick(identifier)}>
                {#if ocupado}
                    <div>
                        <img class="h-5 w-5" src="/iconos/icon.svg" alt="">
                    </div>
                {:else}
                    {#if selection}
                        <div>
                            <svg class="mx-auto h-6 w-6 " width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 5l-5.79 5.782a.745.745 0 0 1-1.052 0L3 7.628" stroke="black" stroke-width="2" stroke-linejoin="round"></path></svg>
                        </div>
                    {:else}
                        <h1 class="font-medium">{num}</h1>
                    {/if}
                {/if}
            </button>   
        {:else}
            <button class="{ selection ? 'scale-110 bg-[#f6c203]' : '' } { ocupado ? 'bg-[#8769DD]': ''} flex place-content-center items-center transform transition duration-200 ease-in-out h-14 w-14 rounded-[10px] shadow-md text-center" on:click={() => handleClick(identifier)}>
                {#if ocupado}
                    <div>
                        <img class="h-5 w-5" src="/iconos/icon.svg" alt="">
                    </div>
                {:else}
                    {#if selection}
                        <div>
                            <svg class="mx-auto h-6 w-6 " width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 5l-5.79 5.782a.745.745 0 0 1-1.052 0L3 7.628" stroke="black" stroke-width="2" stroke-linejoin="round"></path></svg>
                        </div>
                    {:else}
                        <h1 class="font-medium">{num}</h1>
                    {/if}
                {/if}
            </button>
        {/if}
    {/if}

</div>