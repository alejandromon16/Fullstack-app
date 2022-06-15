import { writable } from 'svelte/store';
import { browser } from '$app/env';
import { createClient } from '@urql/svelte';

export const client = createClient({
         url: 'http://192.168.0.13:4000/',
         
    });


const storedUser = JSON.parse(browser && sessionStorage.getItem('user')) || {
	id: null,
};
export const user = writable(browser && storedUser);
user.subscribe((val) => browser && (sessionStorage.user = JSON.stringify(val)));

export const datosFormu = writable({
	origen: null,
	destino: null
});
export const isCompleteFormulario = writable(false);


const storedData = JSON.parse(browser && sessionStorage.getItem('data')) || {
    destino: {
        name: ' ',
        id: ' '
    },
    origen: {
        name: ' ',
        id: ' '
    }
};
export const data = writable(browser && storedData);
data.subscribe((val) => browser && (sessionStorage.data = JSON.stringify(val)));



export const allFiltros = writable(browser && [
	{ orderby: 'nada'},
]);
allFiltros.subscribe((val) => browser && (sessionStorage.allFiltros = JSON.stringify(val)));


export const asientos = writable(browser && []);
asientos.subscribe((val) => browser && (sessionStorage.asientos = JSON.stringify(val)));


export const type = writable('')
export const locations = writable([]);

export const pasajero = writable({
    name: " ",
    phone: " ",
    ci: " "
  });

export const factura = writable({
    name: " ",
    number: " ",
    });

export const routeSelections = writable(
    { 
        reload: false,
        option: false,
        origin:{
            boxId : " ",
            id : " ",
            name: " "
        },
        destination:{
            boxId : " ",
            id : " ",
            name: " "
        }
    }
);
