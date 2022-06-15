<script context="module">
    import { api } from '$lib/utils/api';
    import { getAllBuses, getOrigins } from '$store/queries/get/search';
    
    export async function load({stuff}){
        let res;

        if( stuff.role == 'SUPER_ADMIN' || stuff.role == 'ADMIN'){
            const { data: { allBuses : ress }} = await api(getAllBuses())
            res = ress
        }

        return{
            props: {
                userRole: stuff.role,
                buses: res
            }
        }
    }
</script>


<script>
    import { goto } from '$app/navigation';
    import Page from '$lib/components/admin/page.svelte';

    const page = 'Buses'
    let columns = [
        { 
            key: "model",
            title: "Modelo",
            value: v => v.model,
            sortable: false,
        },
        { 
            key: "seatDownstairs",
            title: "Asientos Abajo",
            value: v => v.seatsDownstairs,
            sortable: false,
            
        },
        {  
            key: "seatUpstairs",
            title: "Asientos arriba",
            value: v => v.seatsUpstairs,
            sortable: false,
        },
        { 
            key: "user",
            title: "Cliente",
            value: v => v.user.name,
            sortable: true,
        }
    ]
    let show = false;
    
    const addForm = () => {
        goto('/admin/cliente/buses/agregar/');
    }

    export let buses;

    $: rows = buses

    const getBuses = async () => {
        const { data: { allBuses: res} } = await api(getAllBuses())
        buses = [...res]
    }
</script>


<Page {columns} {rows} {page}/>