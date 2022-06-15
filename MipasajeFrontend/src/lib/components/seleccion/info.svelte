<script>
    export let precio = 90
    export let cantidad;
</script>




<div class="flex justify-between mx-4 pt-3">
    <div class="">
        <span class="font-gt text-xl font-bold text-black">Seleccionados: {cantidad}</span>
    </div>
    <div class="mr-px">
        <span class="font-gt text-3xl font-semibold text-[#f6c203]">Bs. {precio*cantidad}</span>
    </div>
</div>

