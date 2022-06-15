<script>
    export let active = 'primero';
</script>

<div class="flex justify-center space-x-1 pt-10">
    <div class="relative w-3 h-3">
        <div class="absolute h-3 w-3 rounded-full {active == 'primero' ? 'bg-[#1200E1] animate-ping opacity-40': 'bg-white'}"></div>
        <div class=" h-3 w-3 rounded-full {active == 'primero' ? 'bg-[#1200E1]': 'bg-white'}"></div>
    </div>
    <div class="w-12 h-px bg-white self-center"></div>
    <div class="relative w-3 h-3">
        <div class="absolute h-3 w-3 rounded-full {active == 'segundo' ? 'bg-[#1200E1] animate-ping opacity-40': 'bg-white'}"></div>
        <div class=" h-3 w-3 rounded-full {active == 'segundo' ? 'bg-[#1200E1]': 'bg-white'}"></div>
    </div>
    <div class="w-12 h-px bg-white self-center"></div>
    <div class="relative w-3 h-3">
        <div class="absolute h-3 w-3 rounded-full {active == 'tercero' ? 'bg-[#1200E1] animate-ping opacity-40': 'bg-white'}"></div>
        <div class=" h-3 w-3 rounded-full {active == 'tercero' ? 'bg-[#1200E1]': 'bg-white'}"></div>
    </div>
</div>