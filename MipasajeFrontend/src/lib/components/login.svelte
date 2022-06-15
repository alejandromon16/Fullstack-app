<script>
    import { slide } from 'svelte/transition';
    import { getCredentials } from '$store/queries/get/Clientes';
    import { api } from '$lib/utils/api';
    import { authenticate } from '$lib/utils/auth';

    let name, password;
    let valid = true;

    const tryLogin = async () => {
        try{
            let { data: {loginUser: res }} = await api(getCredentials(name,password))
            console.log('respuest',res)
            if(res !== null){
                await authenticate(res)
                location.href = '/admin/cliente/'
            }else{
                valid =false
            }
        }catch{
            valid = false
        }
    }
</script>



<main class="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl font-gt">
    <section>
        {#if !valid}
            <h2 in:slide={{duration:500}} class="mb-4 text-red-400">Ingresa una cuenta o una contrasena valida</h2>
        {/if}
        <h3 class="font-bold text-2xl">Bienvenido a Mi Pasaje</h3>
        <p class="text-gray-600 pt-2">Ingresa a tu cuenta.</p>
    </section>

    <section class="mt-10">
        <div class="flex flex-col">
            <div class="flex flex-col space-y-4">
                <div>
                    <div>
                        <h1 class="text-gray-700 text-sm font-bold mb-2 ml-3">Email</h1>
                    </div>
                    <div type="text" class="bg-[#f1f2f6] w-full rounded-lg h-12 ">
                        <input type="text" bind:value={name} id="email" class="bg-[#f1f2f6] outline-none h-12 rounded w-full text-gray-700 px-3">
                    </div>
                </div>

                <div class="mt-20">
                    <div class="">
                        <h1 class="text-gray-700 text-sm font-bold mb-2 ml-3">Contrasena</h1>
                    </div>
                    <div type="text" class="w-full rounded-lg h-16">
                        <input type="password" bind:value={password} id="password" class="bg-[#f1f2f6] outline-none h-12 rounded w-full text-gray-700 px-3">
                    </div>
                </div>
            </div>
                
            <div class="flex justify-end">
                <a href=" " class="text-sm text-black hover:text-purple-700 hover:underline mb-6">te olvidaste tu contrasena?</a>
            </div>
            <button class="bg-[#f6c203] mt-2 hover:bg-[#08c2c2] text-white font-bold py-3 rounded shadow-lg hover:shadow-xl transition duration-200" on:click={() => {tryLogin()}}>Ingresar</button>
        </div>
    </section>
</main>

<div class="max-w-lg mx-auto text-center text-black mt-12 mb-6">
    <p class="">No tienes cuenta? <a href=" " class="font-bold hover:underline">Contactanos</a>.</p>
</div>

