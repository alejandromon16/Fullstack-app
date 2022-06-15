<script context="module">
	import { api } from '$lib/utils/api';
	import {getOrigins, getDestinations} from '$store/queries/get/search';

	export async function load() {
		const { data : { origins : res }} =  await api(getOrigins());
		return {
			props: {
				origins : res
			}
		}
	}
</script>

<script>
	import SearchCard from '$lib/components/searchCard/SearchCard.svelte';
	export let origins;
</script>

<div class="snap-y snap-mandatory h-screen w-screen overflow-scroll ">
	<div class="relative snap-start h-screen w-full">
		<div class="h-[38%] bg-gradient-to-b from-[#7A2EF8] to-[#E3BCBC]">
			<div class="pt-7 pl-3">
				<img class="h-auto w-auto" src="iconos/logo2.svg" alt="">
			</div>
			
		</div>
		<div class="absolute h-screen w-full top-[35%] bg-white rounded-t-3xl z-40">
			<div class="container">
				<img class="pb-8 absolute top-[0%] left-1/2 transform -translate-x-1/2 -translate-y-1/2" src="iconos/i6.svg" alt="">
			</div>
			<div class="mt-[34%] mx-3">
				<SearchCard {origins}/>
			</div>
		</div>

		
	</div>
	<div class="snap-start bg-white h-screen" id="content">
		<div class="relative h-screen w-full z-50">
			<div class="container mx-6 pl-2 pt-10">
				<h1 class="font-bold text-xl xs:text-3xl text-left">Encuentra tu pasaje con nosotros!</h1>
				<div class="mx-10 grid grid-cols-3 mt-10 gap-3 space-y-5">
					<div class="">
						<img class="w-14 h-14" src="iconos/easy (1).png" alt="">
					</div>
					<div class="col-span-2">
						<div>
							<h1 class="font-medium text-lg">Facil de usar</h1>
							<p class="font-light text-base">heal amigos como estan</p>
						</div>
					</div>

					<div class="">
						<img class="w-14 h-14" src="iconos/secure.png" alt="">
					</div>
					<div class="col-span-2">
						<div>
							<h1 class="font-medium text-lg">Compra segura</h1>
							<p class="font-light text-base">heal amigos como estan</p>
						</div>
					</div>

					<div class="">
						<img class="w-14 h-14" src="iconos/message.png" alt="">
					</div>
					<div class="col-span-2">
						<div>
							<h1 class="font-medium text-lg">Servicio al cliente</h1>
							<p class="font-light text-base">heal amigos como estan</p>
						</div>
					</div>

				</div>
				<div class="mt-10 pl-5">
					<h1 class="font-bold text-lg xs:text-2xl text-left">Asociados con las mejores flotas de Bolivia</h1>
					<p>Descarga la aplicación gratuita de Omio para obtener experiencia en la que puedes confiar y viajar con confianza.</p>
				</div>
			</div>
		</div>
	</div>
	<div class="snap-start h-screen bg-[#F6F7F9]" id="content">

	</div>
</div>
