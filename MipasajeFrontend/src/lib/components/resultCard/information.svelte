<script>
    import {fade} from 'svelte/transition';
    export let origen
    export let destino

    if(origen == 'Santa Cruz de la Sierra'){
        origen = 'Santa Cruz';
    }
</script>

<div in:fade="{{duration:250,delay:150}}" class="flex w-full mt-[15%]">
    <div class="mx-auto mt-1">
        <div class="flex w-full font-gt text-black font-semibold text-xl space-x-2.5">
            <div>
                <h1>{origen}</h1>
            </div>
            <div class="mt-1">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="black"
                >
                    <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                    />
                </svg>
            </div>
            <div>
                <h1>{destino}</h1>
            </div>
        </div>
    </div>
</div>