<script>
    import Flatpickr from 'svelte-flatpickr';
    import 'flatpickr/dist/flatpickr.css';
    import {toggleOptions} from '$store/config';
    
    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
    
    let date = new Date()
    
    let value, formattedValue;
    
    const options = {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        locale: {
        firstDayOfWeek: 1,
        weekdays: {
          shorthand: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
          longhand: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],         
        }, 
        months: {
          shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Оct', 'Nov', 'Dic'],
          longhand: ['Enero', 'Febreo', 'Мarzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        },
      },
        minDate: "today",
        onChange(selectedDates, dateStr) {
            console.log('flatpickr hook', selectedDates, dateStr);
        }
    };
    
    $: console.log({ value, formattedValue });
    
    function handleChange(event) {
        const [ selectedDates, dateStr ] = event.detail;
        console.log({ selectedDates, dateStr });
    }
    </script>
    
    <main>
        <Flatpickr  class=" bg-[#f1f2f6] outline-none border  border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" {options} bind:value bind:formattedValue on:change={handleChange} name="date" />
    </main>