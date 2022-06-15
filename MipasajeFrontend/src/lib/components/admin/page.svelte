<script>
    import Table from '$lib/components/admin/table.svelte';
    import { fade } from 'svelte/transition';
    import { goto } from '$app/navigation';

    export let page, columns, rows;
    let route

    if (page == 'Ofertas'){
        route = 'rutas'
    }else{
        route = `${page.toLowerCase()}/agregar`
    }
        
</script>

<div in:fade="{{duration:300}}" class="mx-10 mt-10">
    <div class="flex justify-between">
        <div class="ml-2">
            <h2 class="my-6 text-3xl font-bold text-black dark:text-gray-200">{page}</h2>
        </div>
        <div class="self-center pr-2">
            <button class="h-8 w-full px-4 bg-purple-600 font-semibold  rounded-full text-white outline-none" on:click={() => goto(`/admin/cliente/${route}`)} >+ {page}</button>
        </div>
    </div>
    
    <Table {columns} {rows}/>
</div>