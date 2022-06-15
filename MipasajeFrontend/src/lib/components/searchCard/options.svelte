<script>
	import { fly, fade } from 'svelte/transition';
	import { toggleOptions } from '$store/config';
	import { data, type, locations } from '$store/store';
	import { onDestroy } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import DateInline from '$lib/components/dateTime/dateInline.svelte';

	export let icon;

	onDestroy(() => {
		locations.set([]);
	});
	let searchLocation = '';
	let filterLocations = new Array();
	let day;

	$: console.log(day);

	const handleClick = (id, name) => {
		locations.set([]);
		var dmt = document.getElementById('content');
		dmt.classList.toggle('hidden');
		console.log($type);
		if ($type == 'Origen') {
			$data.origen.id = id;
			$data.origen.name = name;
		}
		if ($type == 'Destino') {
			$data.destino.id = id;
			$data.destino.name = name;
		}
		toggleOptions();
	};

	$: {
		if (searchLocation) {
			filterLocations = $locations.filter((location) =>
				location.name.toLowerCase().includes(searchLocation.toLowerCase())
			);
		} else {
			filterLocations = $locations;
		}
	}

	// $:{
	//     if($type){
	//         if( $type == 'Origen'){
	//             locations = origins
	//         }else{
	//             locations = destinations;
	//         }
	//     }
	// }
</script>

<div
	in:fly={{ x: 800, duration: 900, easing: expoOut }}
	out:fly={{ x: 1000, duration: 1000 }}
	class="overscroll-none fixed inset-0 z-50 overflow-hidden"
>
	<div class="absolute inset-0 overflow-hidden">
		<div class="absolute inset-0 " />
		<div class="fixed inset-0 z-50 max-w-full flex">
			<div class="w-screen">
				<div class="h-full flex flex-col bg-white shadow-xl overflow-y-scroll overscroll-y-none">
					{#if $type == 'Fecha'}
						<h1 class="text-center mt-10 font-bold text-xl">
							Selecciona una de las fecha habilitadas
						</h1>
						<DateInline />
					{:else}
						<div class="shadow-lg h-14 w-full">
							<div class="flex mt-4">
								<div>
									<button class="px-4" on:click={() => toggleOptions()}>
										<svg class="h-6 w-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
											><path
												d="M9.634 12l7.043 7.043A1.115 1.115 0 1 1 15.1 20.62l-7.777-7.778A1.112 1.112 0 0 1 6.998 12c-.015-.303.093-.61.325-.842L15.1 3.38a1.115 1.115 0 0 1 1.577 1.577L9.634 12z"
												fill="00000"
												fill-rule="evenodd"
											/></svg
										>
									</button>
								</div>
								<div class="ml-1">
									<input
										class="border-none outline-none"
										type="text"
										placeholder="Buscar"
										bind:value={searchLocation}
									/>
								</div>
							</div>
						</div>
						<div class="flex-1 py-6 overflow-y-scroll overscroll-contain">
							<div class="mt-1">
								<div class="flow-root">
									<ul in:fade={{ duration: 200 }} role="list" class="">
										{#if filterLocations}
											{#each filterLocations as { _id, name } (_id)}
												<li class="flex">
													<button class="w-full h-full" on:click={() => handleClick(_id, name)}>
														<div class="flex-shrink-0 overflow-hidden mb-1 mt-4 py-2">
															<div class="flex px-3">
																<div class="flex-initial pl-2">
																	<img class="h-6 w-6" src={icon} alt=" " />
																</div>
																<div class="flex-initial ml-4 mb-2 self-center">
																	<span class="font-gt font-normal text-xl text-black">{name}</span>
																</div>
															</div>
														</div>
													</button>
												</li>
											{/each}
										{/if}
									</ul>
								</div>
								<div class="h-20" />
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
