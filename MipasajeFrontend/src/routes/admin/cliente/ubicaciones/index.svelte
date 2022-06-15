<script context="module">
    import { api } from '$lib/utils/api';
    import { getAllLocations } from '$store/queries/get/search';

    export async function load({stuff}){
        if (stuff.role == 'ADMIN' || stuff.role == 'SUPER_ADMIN'){
            const {data: {locations: res}} = await api(getAllLocations())
            return {
                props: {
                    locations: res
                }
            }
        }else{
            return { 
            }
        }
    }
</script>
<script>
    import Page from '$lib/components/admin/page.svelte';

    const page = 'Ubicaciones'

    export let locations
    console.log(locations)
    $: rows = locations

    let imgSrc
    let list = []

    let columns = [
        { 
            key: "Id",
            title: "ID",
            value: v => v._id,
            sortable: false,
        },
        { 
            key: "Ubicacion",
            title: "Ubicacion",
            value: v => v.name,
            sortable: false,
            
        },
    ]

    const widgetCloudinary = cloudinary.createUploadWidget({
        cloudName: 'dvklesox1',
        uploadPreset: 'miPasaje',
    }, (err, result) => {
        if(!err && result && result.event === 'success'){
            console.log('imagen subida',result.info)
            imgSrc = result.info.secure_url
            console.log(result.event)
            list = [...list, result.info.secure_url]
        }
    });

    $:console.log(list)

    const files = () => {
        widgetCloudinary.open()
    }
</script>

<Page {columns} {rows} {page} />