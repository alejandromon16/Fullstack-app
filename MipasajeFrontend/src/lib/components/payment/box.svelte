<script>
    import {blur, fade} from 'svelte/transition';
</script>
<div in:blur={{duration:400, delay:150}} class="rounded-3xl shadow-xl h-fit w-full bg-white px-10 py-8">
    <slot />
</div>