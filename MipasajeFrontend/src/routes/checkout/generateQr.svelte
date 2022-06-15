<script>
	import { fade } from 'svelte/transition';
</script>

<div in:fade={{ duration: 400 }} class="grid grid-cols-1">
	<div class="mx-auto mt-24 h-52 w-52 rounded-2xl shadow-lg border-gray-200">
		<img
			class="p-5"
			src="https://latam.kaspersky.com/content/es-mx/images/repository/isc/2020/9910/a-guide-to-qr-codes-and-how-to-scan-qr-codes-2.png"
			alt=""
		/>
	</div>
	<div class="mt-10">
		<h1 class="font-gt text-3xl font-bold text-blue-bus text-center">Bs. 540</h1>
	</div>
</div>
