<script>
    import {getTimeNormal} from '$store/funciones';

    export let journey;

</script>


<button  on:click class="relative">
    <svg class="absolute w-auto xss:w-full h-[203px] xss:h-[187px] drop-shadow -z-10" viewBox="0 0 366 189" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 11C1 5.47715 5.47715 1 11 1H355C360.523 1 365 5.47715 365 11V106.426C365 107.794 364.719 109.148 364.176 110.403L360.634 118.575C359.301 121.651 359.598 125.19 361.425 128.001L363.384 131.015C364.439 132.637 365 134.53 365 136.464V178C365 183.523 360.523 188 355 188H11C5.47716 188 1 183.523 1 178V138.656C1 136.915 1.45415 135.205 2.31757 133.694L6.21401 126.875C7.94427 123.848 7.97206 120.137 6.28735 117.083L2.24422 109.755C1.42806 108.276 1 106.614 1 104.924V11Z" fill="white" stroke="#EEEEEE"/>
    </svg>
    <div class="font-mn container px-10  xs:pt-3">
        <div class="">
            <p class="font-bold text-black text-xs p-auto">Asiento: <b class="font-light">{journey.bus.seatType}</b></p>
        </div>
        <div>
            <div class="grid grid-cols-1">
                <div class="">
                    <div class="flex items-center mt-2">
                        <div class="flex-1">
                            <div>
                                <h1 class="font-extrabold text-black text-lg">{getTimeNormal(journey.departure)}</h1>
                            </div>
                            
                        </div>
    
                        <svg class="ml-2" width="100" height="2" viewBox="0 0 50 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.607143 0.959938H50.3929" stroke="black" stroke-linecap="square" stroke-linejoin="round" stroke-dasharray="3"/>
                        </svg> 
                        <div class="flex-none">
                            <img class="h-10 w-10" src="iconos/bus.svg" alt="">
                        </div> 
                         <svg class="mr-2" width="100" height="2" viewBox="0 0 50 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.607143 0.959938H50.3929" stroke="black" stroke-linecap="square" stroke-linejoin="round" stroke-dasharray="3"/>
                        </svg> 
                        <div class="flex-1">
                            <div>
                                <h1 class="font-extrabold text-black text-lg text-right ">{getTimeNormal(journey.arrival)}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex justify-between font-light text-[10px] xs:text-xs mb-3">
                    <div class="pr-[100px] ">
                        <h1 class="text-left">{journey.route.origin.name}</h1>
                    </div>
                    <div class="pl-10">
                        <h1>{journey.route.destination.name}</h1>
                    </div>

                </div>
                <div>
                    <svg width="280" height="2" viewBox="0 0 316 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 1H317" stroke="#8A959E" stroke-opacity="0.5" stroke-linecap="square" stroke-dasharray="4"/>
                    </svg>
                </div>
                <div class="flex justify-between mt-4">
                    <div class="">
                        <img src="flotas/quijarreno.jpg" alt="" class="h-7 w-26" />
                    </div>
                    <div class="grid justify-items-end">
                        <span class="font-extrabold text-[#D6AB0F] text-lg">Bs. {journey.price}</span>
                    </div>
                </div>
                
            </div>
        </div>
    </div>      
</button>
