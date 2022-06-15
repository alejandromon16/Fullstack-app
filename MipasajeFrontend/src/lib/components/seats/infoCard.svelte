<script>
    import { fade } from 'svelte/transition';
    import {getTimeNormal} from '$store/funciones';
    
    export let seatType;
    export let arrival;
    export let departure;
</script>


<div in:fade="{{duration:250,delay:200}}" class="rounded-[10px] shadow-md h-fit w-full bg-white font-mn py-3"> 
    <div class="px-4 mb-2">
        <img  class="h-9 w-[124px]" src="/flotas/quijarreno.jpg" alt="">
    </div>

    
    <div class="flex px-4 justify-between">
        <div class="rounded-[10px] h-7 w-fit bg-[#FAC504] px-2 text-xs grid place-content-center">
            <h1 class="font-bold ">Asiento: <b class="font-light"> {seatType}</b></h1>
        </div>
        <div class="flex items-center text-lg font-extrabold">
            <h1>{getTimeNormal(departure)}</h1>
            <div>
                <img class="w-auto" src="/iconos/line3.svg" alt="">
            </div>
            <h1>{getTimeNormal(arrival)}</h1>
        </div>
    </div>
</div>