export const getTime = (addMinutes = 0) => {
	let now = new Date();
	now = now.setMinutes(now.getMinutes() + addMinutes);
	now = new Date(now);
	return now;
};

export const getDayString = (day) => {
	switch (day) {
		case 0:
			day = 'Domingo';
			break;
		case 1:
			day = 'Lunes';
			break;
		case 2:
			day = 'Martes';
			break;
		case 3:
			day = 'Miercoles';
			break;
		case 4:
			day = 'Jueves';
			break;
		case 5:
			day = 'Viernes';
			break;
		case 6:
			day = 'Sabado';
			break;
	}
	return day;
};

export const getMonthString = (month) => {
	switch (month) {
		case 0:
			month = 'Ene';
			break;
		case 1:
			month = 'Feb';
			break;
		case 2:
			month = 'Mar';
			break;
		case 3:
			month = 'Abr';
			break;
		case 4:
			month = 'May';
			break;
		case 5:
			month = 'Jun';
			break;
		case 6:
			month = 'Jul';
			break;
		case 7:
			month = 'Ago';
			break;
		case 8:
			month = 'Sep';
			break;
		case 9:
			month = 'Oct';
			break;
		case 10:
			month = 'Nov';
			break;
		case 11:
			month = 'Dec';
			break;
	}
	return month;
};

export const searchCardDate = () => {
	const today = new Date();
	let month = today.getMonth();
	let day = today.getDay();
	let numDayOfMonth = today.getDate();

	month = getMonthString(month);
	day = getDayString(day);

	let result = day + ', ' + numDayOfMonth + ' ' + month;

	return result;
};

export const getTimeNormal = (date) => {
	let time = new Date(date);
	let hours = time.getHours();
	let mins = time.getMinutes();

	if (mins < 10) {
		return hours + ':' + '0' + mins;
	} else {
		return hours + ':' + mins;
	}
};

export function getDifferenceInDays(date1, date2) {
	const diffInMs = Math.abs(date2 - date1);
	return diffInMs / (1000 * 60 * 60 * 24);
}

export function getDifferenceInHours(date1, date2) {
	const diffInMs = Math.abs(date2 - date1);
	return diffInMs / (1000 * 60 * 60);
}

export function getDifferenceInMinutes(date1, date2) {
	const diffInMs = Math.abs(date2 - date1);
	return diffInMs / (1000 * 60);
}

export function getDifferenceInSeconds(date1, date2) {
	const diffInMs = Math.abs(date2 - date1);
	return diffInMs / 1000;
}

export const differenceTime = (salida, llegada) => {
	let time = new Date(salida);
	let tim2 = new Date(llegada);
	let dif = getDifferenceInMinutes(time,tim2);
	let horas = dif/60;
	let minutos = dif%60;
	horas = Math.trunc(horas);

	return horas+'h'+minutos+'m'
};
export const differenceTime2 = (salida, llegada) => {
	let time = new Date(salida);
	let tim2 = new Date(llegada);
	let dif = getDifferenceInMinutes(time,tim2);
	return dif;
};