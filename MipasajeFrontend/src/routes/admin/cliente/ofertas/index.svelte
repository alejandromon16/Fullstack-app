<script context="module">
    import { api } from '$lib/utils/api';
    import { getAllJourneys, getJourneysOfUser } from '$store/queries/get/search';

    export async function load({stuff, session}){
        
        if(stuff.role == "ADMIN" && stuff.role == "SUPER_ADMIN"){
            const { data: { allJourneys : res}} = await api(getAllJourneys())
            return { 
                props: { 
                    journeys: res
                }
            }
        }else{
            const { data: { journeysByUserId: res }} = await api(getJourneysOfUser(session.user))
            return { 
                props: { 
                    journeys: res
                }
            }
        }
    }
</script>

<script>
    import { goto } from '$app/navigation';
    import {fade} from 'svelte/transition';
    import Table from '$lib/components/admin/table.svelte';
    import Page from '$lib/components/admin/page.svelte';

    let show = false;
    const page = 'Ofertas'
    export let journeys

    $: rows = journeys

    const getOfertas = async () => {
        const { data: { allJourneys : res}} = await api(getAllJourneys());
        journeys = res
    }
    const addForm = () => {
        goto('/admin/cliente/buses/agregar/');
    }

    let columns = [
        { 
            key: "model",
            title: "Modelo",
            value: v => v.bus.model,
            sortable: false,
        },
        { 
            key: "departure",
            title: "Salida",
            value: v => v.route.origin.name,
            sortable: false,
            
        },
        {  
            key: "arrival",
            title: "Llegada",
            value: v => v.route.destination.name,
            sortable: false,
        },
        { 
            key: "timeD",
            title: "Horario de Salida",
            value: v => new Date(v.departure).toLocaleTimeString(),
            sortable: false,
        },
        { 
            key: "timeA",
            title: "Horario de llegada",
            value: v => new Date(v.arrival).toLocaleTimeString(),
            sortable: false,
        }
    ]
</script>


<Page {columns} {rows} {page}/>
