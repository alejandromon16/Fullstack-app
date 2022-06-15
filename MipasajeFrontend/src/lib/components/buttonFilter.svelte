<script>
	import { fade } from 'svelte/transition';
	import { allFiltros } from '$store/store';

	export let filtro;
</script>



<button class="flex rounded-full w-5 h-5 border-2 border-blue-bus" on:click>
	{#if $allFiltros.includes(filtro) || ($allFiltros[0].orderby == filtro)}
		<div transition:fade={{ duration: 50 }} class="m-auto">
			<div class="rounded-full bg-blue-bus w-3 h-3" />
		</div>
	 {/if}
</button>

