<script>
	let flota;
	export let i;
	export let name;
	let algo = 'bg-blue-bus';
	const selector = (id) => {
		var tag = document.getElementById(id);
		tag.classList.remove('bg-gray-300');
		tag.classList.toggle('bg-blue-bus');
	};
</script>

<div class="py-1 px-1">
	<div class="bg-gray-300 h-max w-max rounded-full" id={i} on:click={() => selector(i)}>
		<h1 class="px-3 font-normal antialiased text-gray-700 font-gt">{name}</h1>
	</div>
</div>
