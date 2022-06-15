<script>
	import { fade } from 'svelte/transition';
	import { getTimeNormal, differenceTime} from '$store/funciones';
	import { onMount } from 'svelte';

	let load = false;
	onMount(() => {
		setTimeout(() => {
			load = true;
		}, 300);
	});

	export let datos;
	let cliente = 'copacabana';
</script>

{#if load}
	<div in:fade={{ duration: 300 }} class="bg-white rounded-md shadow-md h-auto w-full my-2">
		<div class="pl-4 py-3 pr-3">
			<div class="py-2">
				<p class="uppercase text-blue-bus text-xs p-auto">Asiento: {datos.seatType}</p>
			</div>
			<div class="grid grid-cols-2">
				<div class="">
					<div class="flex items-center">
						<div class="flex-1 font-bold text-blue-bus">
							<span class="font-gt text-blue-bus font-bold text-lg ">{getTimeNormal(datos.schedule.departure)}</span>
						</div>

						<div class="flex-1 h-px rounded-md w-20 bg-[#a1a9c3]" />
						<div>
							<span class="font-gt font-ligth text-[#a1a9c3] text-sm ">{differenceTime(datos.schedule.departure, datos.schedule.arrival)}</span>
						</div>
						<div class="flex-1 h-px rounded-md w-20 bg-[#a1a9c3]" />
					</div>

					<div class="pr-10">
						<span class="font-gt font-light text-sm">{datos.route.origin.name}</span>
					</div>
				</div>
				<div class="">
					<div class="flex">
						<div class="flex-initial">
							<span class="font-gt text-blue-bus font-bold text-lg ">{getTimeNormal(datos.schedule.arrival)}</span>
						</div>
						<div class="flex-initial">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								fill="#f6c203"
								viewBox="0 0 24 24"
								stroke="#f6c203"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
								/>
							</svg>
						</div>
					</div>
					<div class="">
						<span class="font-gt font-light text-sm ">{datos.route.destination.name}</span>
					</div>
				</div>
				<div class="py-1 pt-2.5">
					<img src="/flotas/{cliente.toLowerCase()}.jpg" alt="" class="h-6 w-24" />
				</div>
				<div class="grid justify-items-end py-1 pt-2.5">
					<span class="font-gt font-bold text-blue-bus text-lg">Bs. {datos.price}</span>
				</div>
			</div>
		</div>
	</div>
{/if}
