<script>
    export let text = 'Continuar';
    export let color = 'bg-[#F6C203]'
</script>

<button type=submit class="rounded-lg {color} h-14 w-full text-white self-center md:my-5 md:mx-auto" on:click>
    <span class="antialiased font-gt font-semibold text-lg">{text}</span>
</button>
