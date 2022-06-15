<script>
	import { draw, fade, slide, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import Button from '$lib/ui/button.svelte'
	import { goto } from '$app/navigation';

	let text = 'inicio';
</script>




<div in:slide="{{ duration:1500, delay:400}}" out:slide={{duration:1500, delay:100}} class="grid grid-cols-1 justify-items-center bg-white font-gt">
	<h1 class="font-medium text-4xl mt-10 animate-bounce">Felicidades!</h1>
	<div class="grid mt-20 justify-center items-center h-60 w-60 rounded-full bg-gradient-to-b from-[#7A2EF8] to-[#E3BCBC]">
		<svg class="animate-pulse" width="113" height="93" viewBox="0 0 113 93" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path  d="M40.4934 63.7096L18.5609 39.2439C14.3379 34.5331 7.3903 34.5331 3.16727 39.2439C-1.05576 43.9547 -1.05576 51.7047 3.16727 56.4154L32.7966 89.4669C37.0196 94.1777 43.9671 94.1777 48.1902 89.4669L109.833 20.7047C114.056 15.9939 114.056 8.24387 109.833 3.53309C105.61 -1.1777 98.6622 -1.1777 94.4391 3.53309L40.4934 63.7096Z" fill="white"/>
		</svg>
	</div>
	<div class="container px-20 text-center mt-10">
		<h1>Tu compra ha sido completada, si no recibes tu pasajes dentro de los 3 mins, por favor contactanos </h1>
		<div class="mx-12 mt-8">
			<button class="rounded-lg bg-black h-11 w-full text-white self-center" on:click={() => goto('/')}>
				<span class="antialiased font-gt font-semibold text-lg">{text}</span>
			</button>
		</div>
	</div>
</div>
