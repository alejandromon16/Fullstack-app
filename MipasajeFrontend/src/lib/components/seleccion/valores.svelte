<script>
    import { slide } from 'svelte/transition';
    import { quadInOut } from 'svelte/easing';
</script>


<div transition:slide="{{ duration: 100, easing: quadInOut }}" class="fixed inset-x-0 z-50 bg-white shadow-gray-700 shadow-2xl rounded-t-xl bottom-0 w-full h-max py-2 pt-10 px-2">
   <slot></slot>
</div>