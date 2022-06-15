import models from '../models';
import {
  LocationService,
  UserService,
  RouteService,
  BusService,
  JourneyService,
} from '../services';

export async function clearDb() {
  await models.Order.deleteMany();
  await models.Journey.deleteMany();
  await models.Route.deleteMany();
  await models.Bus.deleteMany();
  await models.User.deleteMany();
  await models.Location.deleteMany();
}

export async function populateSampleData() {
  const locationsData = [
    'Santa Cruz de la Sierra',
    'Trinidad',
    'Cochabamba',
    'La paz ciudad',
    'Tarija ciudad',
    'Cobija',
    'San joaquin',
    'Oruro ciudad',
    'Sucre',
    'Puerto Suarez',
    'Puerto Quijarro',
  ];

  const usersData = [
    {
      name: 'copacabana',
      email: 'admin@copacabana.com',
      password: 'copacabana',
      logo: 'https://media.graphcms.com/rh1b7iCYRMDJbOBHHLkz?_ga=2.251445444.316059397.1643994794-912643931.1643897382',
      role: 'CLIENT'
    },

    {
      name: 'flixbus',
      email: 'admin@flixbus.com',
      password: 'flixbus',
      logo: 'https://cdn-cf.cms.flixbus.com/drupal-assets/ogimage/flixbus.png',
      role: 'CLIENT'
    },
    {
      name: 'alejandro',
      email: 'alejandromontero1551@gmail.com',
      password: 'alejandro',
      role: 'SUPER_ADMIN'

    }
  ];

  const locations = await Promise.all(
    locationsData.map(async (name) => LocationService.create(name)),
  );

  const users = await Promise.all(
    usersData.map(async (data) =>
      UserService.create(data.name, data.email, data.password, data.logo, data.role),
    ),
  );

  const getLocationId = (name) => locations.filter((x) => x.name === name)[0]._id;
  const getUserId = (name) => users.filter((x) => x.name === name)[0]._id;
  console.log(users)

  const busesData = [
    {
      model: 'Volvo1',
      seatType: 'CAMA',
      seatsUpstairs: 0,
      seatsDownstairs: 35,
      userId: getUserId(usersData[0].name),
    },
    {
      model: 'Volvo2',
      seatType: 'CAMA',
      seatsUpstairs: 0,
      seatsDownstairs: 35,
      userId: getUserId(usersData[0].name),
    },
    {
      model: 'Volvo3',
      seatType: 'CAMA',
      seatsUpstairs: 21,
      seatsDownstairs: 21,
      userId: getUserId(usersData[0].name),
    },
    {
      model: 'Volvo1',
      seatType: 'CAMA',
      seatsUpstairs: 21,
      seatsDownstairs: 21,
      userId: getUserId(usersData[1].name),
    },
    {
      model: 'Volvo43',
      seatType: 'CAMA',
      seatsUpstairs: 21,
      seatsDownstairs: 21,
      userId: getUserId(usersData[1].name),
    },
  ];

  const routesData = [
    {
      userId: getUserId(usersData[0].name),
      originId: getLocationId(locationsData[0]),
      destinationId: getLocationId(locationsData[1]),
    },
    {
      userId: getUserId(usersData[0].name),
      originId: getLocationId(locationsData[0]),
      destinationId: getLocationId(locationsData[2]),
    }
  ];

  const buses = await Promise.all(
    busesData.map(async (data) =>
      BusService.create(
        data.userId,
        data.model,
        data.seatsDownstairs,
        data.seatsUpstairs,
        data.seatType,
      ),
    ),
  );

  const routes = await Promise.all(
    routesData.map(async (data) =>
      RouteService.create(data.userId, data.originId, data.destinationId),
    ),
  );

  const getBusId = (index) => buses[index]._id;
  const getRouteId = (index) => routes[index]._id;

  const addHours = (date, hours) => date.getTime() + hours * 60 * 60 * 1000;

  const now = new Date();
  // now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);

  // const oneHourLater = addHours(now, 1)
  // const twoHoursLater = addHours(now, 2)
  // const fourHoursLater = addHours(now, 4)
  const nextDay = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  // const nextDayOneHourLater = nextDay.setHours(nextDay.getHours() + 1);
  // const nextDayTwoHourLater = nextDay.setHours(nextDay.getHours() + 2);
  // const nextDayFourHourLater = nextDay.setHours(nextDay.getHours() + 4);

  const journeysData = [
    {
      userId: getUserId(usersData[0].name),
      busId: getBusId(0),
      routeId: getRouteId(0),
      price: 50,
      departure: now,
      arrival: addHours(now, 1),
    },
    {
      userId: getUserId(usersData[0].name),
      busId: getBusId(0),
      routeId: getRouteId(0),
      price: 50,
      departure: addHours(now, 3),
      arrival: addHours(now, 4),
    },
  
  ];

  const journeys = await Promise.all(
    journeysData.map(async (data) =>
      JourneyService.create(
        data.userId,
        data.busId,
        data.routeId,
        data.departure,
        data.arrival,
        data.price,
      ),
    ),
  );
}
