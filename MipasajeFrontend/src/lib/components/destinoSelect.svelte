<script>
	import { fly } from 'svelte/transition';
	import { data } from '$store/store';

	let open = false;
	let valor;


	const handleClick = () => {
		open = !open;
		var content = document.getElementById('content');
		content.classList.toggle('hidden');
	};
	const handleDestino = (destino) => {
		$data.destino = destino;
		handleClick();
	};

	let destinos = [
		'Cochabamba',
		'La paz',
		'Tarija',
		'Trinidad',
		'Puerto Quijarro',
		'Puerto Suarez',
		'Sucre'
	];
	destinos.sort();

	let searchDestino = '';
	let filterDestinos = new Array();

	$: {
		if (searchDestino) {
			filterDestinos = destinos.filter((destino) =>
				destino.toLowerCase().includes(searchDestino.toLowerCase())
			);
		} else {
			filterDestinos = destinos;
		}
	}
</script>

{#if open}
	<div
		in:fly={{ x: 1000, duration: 300 }}
		out:fly={{ x: 1000, duration: 1000 }}
		class="overscroll-none fixed inset-0 overflow-hidden"
	>
		<div class="absolute inset-0 overflow-hidden">
			<div class="absolute inset-0 " />
			<div class="fixed inset-0 z-50 max-w-full flex">
				<div class="w-screen">
					<div class="h-full flex flex-col bg-white shadow-xl overflow-y-scroll overscroll-y-none">
						<div class="shadow-lg h-14 w-full">
							<div class="flex mt-4">
								<div>
									<button on:click={handleClick} class="px-4">
										<svg class="h-6 w-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
											><path
												d="M9.634 12l7.043 7.043A1.115 1.115 0 1 1 15.1 20.62l-7.777-7.778A1.112 1.112 0 0 1 6.998 12c-.015-.303.093-.61.325-.842L15.1 3.38a1.115 1.115 0 0 1 1.577 1.577L9.634 12z"
												fill="#717fa4"
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
										bind:value={searchDestino}
									/>
								</div>
							</div>
						</div>
						<div class="flex-1 py-6 overflow-y-scroll overscroll-contain">
							<div class="mt-1">
								<div class="flow-root">
									<ul role="list" class="">
										{#each filterDestinos as destino}
											<li class="flex">
												<button class="w-full h-full" on:click={() => handleDestino(destino)}>
													<div class="flex-shrink-0 overflow-hidden mb-1 mt-4 py-2">
														<div class="flex px-3">
															<div class="flex-initial pl-2">
																<svg
																	class="h-6 w-6"
																	viewBox="0 0 24 24"
																	xmlns="http://www.w3.org/2000/svg"
																	xmlns:xlink="http://www.w3.org/1999/xlink"
																	><defs
																		><path
																			d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-8-3a8 8 0 1 1 16 0c0 1.842-1.176 4.053-3.53 6.635L12 22l-4.47-5.365C5.175 14.053 4 11.842 4 10z"
																			id="Pin__a"
																		/></defs
																	><use
																		fill="#425486"
																		xmlns:xlink="http://www.w3.org/1999/xlink"
																		xlink:href="#Pin__a"
																		fill-rule="evenodd"
																	/></svg
																>
															</div>
															<div class="flex-initial ml-4 mb-2 self-center">
																<span class="font-gt font-normal text-xl text-[#425486]"
																	>{destino}</span
																>
															</div>
														</div>
													</div>
												</button>
											</li>
										{/each}
									</ul>
								</div>
								<div class="h-20" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<button type="text" class="bg-[#f1f2f6] w-full rounded-lg h-12 border-none" on:click={handleClick}>
	<div class="flex">
		<div class="flex-initial px-2.5">
			<svg
				class="h-6 w-6"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				><defs
					><path
						d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-8-3a8 8 0 1 1 16 0c0 1.842-1.176 4.053-3.53 6.635L12 22l-4.47-5.365C5.175 14.053 4 11.842 4 10z"
						id="Pin__a"
					/></defs
				><use
					fill="#A1A9C3"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					xlink:href="#Pin__a"
					fill-rule="evenodd"
				/></svg
			>
		</div>
		<div class="flex-initial ml-1 pb-2">
			{#if $data.destino}
				<h1 class="font-gt font-normal text-base text-blue-letters">{$data.destino}</h1>
			{:else}
				<span class="font-gt font-normal text-base text-gray-400">Destino</span>
			{/if}
		</div>
	</div>
</button>
