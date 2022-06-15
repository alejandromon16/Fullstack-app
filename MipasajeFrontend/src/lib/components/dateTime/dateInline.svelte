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
    allowInput: false,
    altInput: false,
    inline: true,
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
    maxDate: date.addDays(5),
    enableTime: false,
    onChange(selectedDates, dateStr) {
        console.log('flatpickr hook', selectedDates, dateStr);
    }
};

$: console.log({ value, formattedValue });

function handleChange(event) {
    const [ selectedDates, dateStr ] = event.detail;
    console.log({ selectedDates, dateStr });
    toggleOptions();
}
</script>

<main class="font-gt grid justify-center mt-5">
    <Flatpickr class="" {options} bind:value bind:formattedValue on:change={handleChange} name="date" />
</main>