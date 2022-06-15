<script context="module">
  import { getValidToken } from '$store/queries/get/search';
  import { api } from '$lib/utils/api';

  export async function load({session}){
    const {data : { validToken : res}} = await api(getValidToken(session.token))
    if (session.user && res) {
      return {
        status: 302,
        redirect: '/admin/cliente/'
      }
    }
    return {}
  }
</script>


<script>
  import Login from '$lib/components/login.svelte';
  import { fade } from 'svelte/transition';
</script>

<div out:fade={{duration:350}} class="snap-start h-screen w-full">
  <div class="relative h-2/5 bg-gradient-to-b from-[#7A2EF8] to-[#7293db]">
    <div class="pt-5 ml-6">
      <span class="font-gt font-bold text-4xl text-white">MiPasaje</span>
    </div>
    <div class="pt-24 mx-4">
      <Login class="absolute" />
    </div>
  </div>
  <div class="h-3/5 bg-[#f1f2f6]" />
</div>