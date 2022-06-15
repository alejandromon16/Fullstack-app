<!-- <script>
  import { fade } from 'svelte/transition';

  export let Categories;
  export let buses
  console.log(Categories)
</script>

<div in:fade={{duration:400, delay:100}} class="w-full overflow-hidden rounded-lg border-2 border-gray-100 dark:border-none shadow-md font-gt">
  <div class="w-full overflow-x-auto">
    <table class="w-full whitespace-no-wrap">
      <thead>
        <tr
          class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
        >
        {#each Categories as category}
          <th class="px-4 py-3">{category.name}</th>
        {/each}
        </tr>
      </thead>
      <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
        {#each Categories as Category }
          {#each buses as bus}
           
          <tr class="text-gray-700 dark:text-gray-400">
            <td class="px-4 py-3">
              <div class="flex items-center text-sm">
                <!-- Avatar with inset shadow 
                <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                  <img
                    class="object-cover w-full h-full rounded-full"
                    src="https://www.pikpng.com/pngl/m/594-5947595_bus-icon-png-cuando-llega-clipart.png"
                    alt=""
                    loading="lazy"
                  />
                  <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
                </div>
                <div>
                  <p class="font-semibold">{bus.Category.dataType}</p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">{bus._id}</p>
                </div>
              </div>
            </td>
            <td class="px-4 py-3 text-xs">
              <span
                class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:text-white dark:bg-orange-600"
              >
                {bus.seatType}
              </span>
            </td>
            <td class="px-4 py-3 text-sm"> {bus.seatsDownstairs} </td>
            
            <td class="px-4 py-3 text-sm"> {bus.seatsUpstairs} </td>
          </tr>
          {/each}
        {/each}
      </tbody>
    </table>
  </div>

</div> -->

<script>
  import {fade} from 'svelte/transition';
  import SvelteTable from "svelte-table";
  export let rows
  export let columns
</script>

<div in:fade={{duration:400, delay:300}} class="w-full overflow-hidden rounded-lg border-2 border-gray-100 dark:border-none shadow-md font-gt">
  <div class="w-full overflow-x-auto table">
    <SvelteTable
   classNameTable={['w-full whitespace-no-wrap']}
   classNameTbody={['bg-white divide-y dark:divide-gray-700 dark:bg-gray-800']}
   {columns} {rows}></SvelteTable>
  </div>
</div>

<style>
  :global(.table td){
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 300;
  }

  :global(.table th){
    font-weight: 600;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }

  :global(.table th){
    font-weight: 600;
  }

  :global(.table thead tr){
    letter-spacing: 0.025rem;
    text-transform: uppercase;
  }
</style>


