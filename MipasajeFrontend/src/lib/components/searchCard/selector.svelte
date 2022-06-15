<script>
	export let icon;
	export let text;
    export let type;
	export let errorSelector;
	let error = false
	

	$:{
		if(errorSelector){
			error = false
			if(type == "Origen"){
				if(errorSelector.origen){
					error = true
				}
			}
			if(type == "Destino"){
				if(errorSelector.destino){
					error = true
				}
			}
		}
	};
</script>

<div>
	<button type="text" class="bg-white h-[51px] w-full rounded-md {error ? 'border-2 border-red-200 animate-bounce':'border-none'} shadow-xl" on:click>
		<div class="flex">
			<div class="flex-initial px-2.5 mt-2">
				<img class="h-6 w-6" src={icon} alt="">	
			</div>
			<div class="flex-initial ml-1">
                    <h1 class="font-gt text-left font-light text-xs text-black">{type}</h1>
					<h1 class="font-gt font-[400] text-base text-black">{text}</h1>
			</div>
		</div>
	</button>
</div>
