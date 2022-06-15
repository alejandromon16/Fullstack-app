<script context="module">
    import { api }  from '$lib/utils/api';
    import { getAllUsers } from '$store/queries/get/search';
  
    export async function load({stuff}){
        if(!stuff.role == "ADMIN" || !stuff.role == "SUPER_ADMIN"){
            return{
                status: 302,
                redirect: 'admin/client/'
            }
        }else if(stuff.role == "SUPER_ADMIN"){
            const { data : { users: res}} = await api(getAllUsers())
            return {
                props: {
                    users:res
                }
            }
        }

        return {}
      }
  </script>

 <script>
    import Page from '$lib/components/admin/page.svelte'
    
    const page = 'Usuarios'
    let columns = [
        { 
            key: "Id",
            title: "ID",
            value: v => v._id,
            sortable: false,
        },
        { 
            key: "Usuario",
            title: "Usuarios",
            value: v => v.name,
            sortable: false,
            
        },
        { 
            key: "Role",
            title: "Rol",
            value: v => v.role,
            sortable: false,
            
        },
    ]
    export let users
    $: rows = users
 </script>

 <Page {columns} {rows} {page} on:click/>