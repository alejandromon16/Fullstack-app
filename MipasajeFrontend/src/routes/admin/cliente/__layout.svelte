<script context="module">
  import { api }  from '$lib/utils/api';
  import { logout } from '$lib/utils/auth';
  import { getValidToken, giveMeRole } from '$store/queries/get/search';

  export async function load({session}){
      const {data : { validToken : res}} = await api(getValidToken(session.token))
      const { data: { giveMeRole: res2}} = await api(giveMeRole(session.user))
      if(!session.user || !res){
        logout()
        return {
          status: 302,
          redirect: '/admin/'
        }
      }else{
        return{
          stuff: { role: res2}
        }
      }
      return {}
    }
</script>

<script>
  import { isSideMenuOpen, closeSideMenu, showModal, isDark, showModalLocations } from '$store/config';
  import { clickOutside } from '$lib/ioevents/click';
  import { keydownEscape } from '$lib/ioevents/keydown';
  import SideBar from '$lib/components/admin/sidebar.svelte';
  import Header from '$lib/components/admin/header.svelte';
  import ModalForm from '$lib/components/admin/modalForm.svelte';
  import ModalDestino from '$lib/components/admin/modalLocations.svelte';
  import { fade } from 'svelte/transition';

  let show = false;

</script>


<section id="body" class="font-gt">
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900" class:overflow-hidden={$isSideMenuOpen}>
    <!-- Desktop sidebar -->
    <aside
      class="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0"
    >
      <SideBar />
    </aside>

    <!-- Mobile sidebar -->
    <!-- Backdrop -->
    {#if $isSideMenuOpen}
      <div
        class="fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
      />
      <aside
        class="fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 md:hidden"
        use:clickOutside={['nav-mobile-hamburger']}
        on:click-outside={closeSideMenu}
        use:keydownEscape
        on:keydown-escape={closeSideMenu}
      >
        <SideBar />
      </aside>
    {/if}

    <div class="flex flex-col flex-1 w-full">
      {#if $showModal}
        <div transition:fade="{{duration:200}}" class="absolute inset-0 z-50 ">
            <div class="grid grid-cols-1 justify-items-center place-content-center fixed inset-0 bg-gray-400 bg-opacity-75">
                <ModalForm />
            </div>
        </div>
      {/if}
      {#if $showModalLocations}
        <div transition:fade="{{duration:200}}" class="absolute bg-gray-400 inset-0 z-50 bg-opacity-75">
          <div class="grid grid-cols-1 justify-items-end  fixed inset-0">
              <ModalDestino />
          </div>
       </div>
      {/if}
      <Header />
      <div class="h-screen {$isDark? '':'bg-gray-100'}">
        <slot/>
      </div>
      
    </div>
  </div>
</section>
