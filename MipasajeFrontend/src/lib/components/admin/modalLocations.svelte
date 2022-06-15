<script>
	import { fly } from 'svelte/transition';
	import { data } from '$store/store';
    import { toggleModalLocations }  from '$store/config';
    import { routeSelections, client } from '$store/store';
    import { onMount } from 'svelte';
    import { getAvailableDestinationsByClient, getAvailableOriginsByClient } from '$store/queries/get/search';
    import { addRoute } from '$store/queries/create/Rutas';
    import { getCookieItem } from '$lib/utils/auth';
    import { api } from '$lib/utils/api';
    import { sorting } from '$lib/utils/commons';

    
    let origin = false
    let locations = [];
    let userid

    const userID = ( async () => {
        return await getCookieItem('user')
    })

    const getOriginsAvailable = async () => {
        const { data: { availableOrigin: res }} = await api(getAvailableOriginsByClient(await userID()))
        locations = sorting(res, 'name')
    }
    
    const getDestinationsAvailable = async () => {
        const { data : { availableDestinationsForOrigin: res} } = await api(getAvailableDestinationsByClient(await userID(), $routeSelections.origin.id))
        locations = sorting(res, 'name')
    }

    const giveOneLocation = async () => {
        const { data : { availableDestinationsForOrigin: res} } = await api(getAvailableDestinationsByClient(await userID(), $routeSelections.origin.id))
        return res[0]._id
    }

    onMount(async () => {
        origin = false
        if($routeSelections.option){
            console.log('dist')
                await getDestinationsAvailable()
        }else{
            origin = true
            await getOriginsAvailable()
        }
        
    })

	let open = false;

	const handleClick = () => {
		open = !open;
		var content = document.getElementById('content');
		content.classList.toggle('hidden');
	};

	const handleLocation = async (id) => {
        console.log(origin)
        if(origin){
            $routeSelections.origin.id = id;
            const destinationID = await giveOneLocation()
            const  res = await api(addRoute(await userID(), $routeSelections.origin.id , destinationID));
            console.log('this is the res',res)
            if(res){
                toggleModalLocations();
                $routeSelections.reload = true;
            }
        }else{
            const res = await api(addRoute(await userID(), $routeSelections.origin.id ,id));
            if(res){
                toggleModalLocations();
                $routeSelections.reload = true;
            }
        }
	};


	let searchLocation = "";
	let filterLocations = new Array();


	$: {
		if (searchLocation) {
			filterLocations = locations.filter((location) =>
				location.name.toLowerCase().includes(searchLocation.toLowerCase())
			);
		} else {
			filterLocations = locations;
		}
	}
</script>


<div
    in:fly={{ x: 1000, duration: 300 }}
    out:fly={{ x: 1000, duration: 1000 }}
    class="overscroll-none fixed inset-0 overflow-hidden"
>
    <div class="absolute inset-0 overflow-hidden">
        <div class="absolute inset-0" />
        <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <div class="w-screen max-w-md">
                <div class="h-full flex  flex-col bg-white rounded-xl shadow-xl overflow-y-scroll overscroll-y-none">
                    <div class="shadow-lg h-14 w-full">
                        <div class="flex mt-4">
                            <div>
                                <button on:click={toggleModalLocations} class="px-4">
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
                                    bind:value={searchLocation}
                                />
                            </div>
                        </div>
                    </div>
                    <div class="flex-1 py-6 overflow-y-scroll overscroll-contain">
                        <div class="mt-1">
                            <div class="flow-root">
                                <ul role="list" class="">
                                    {#each filterLocations as {_id, name}}
                                        <li class="flex">
                                            <button class="w-full h-full" on:click={() => handleLocation(_id)}>
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
                                                                >{name}</span
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

