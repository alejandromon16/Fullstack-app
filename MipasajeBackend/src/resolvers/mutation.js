import {User} from '../models';
import {
  LocationService,
  UserService,
  RouteService,
  BusService,
  JourneyService,
} from '../services';
import {clearDb, populateSampleData} from './test';

export default {
  addLocation: async (_, args) => LocationService.create(args.input.name),

  addUser: async (_, {input}) =>
    UserService.create(input.name, input.email, input.password, input.logo),
  deleteUser: async (_, {id}) => UserService.remove(id),
  updateUser: async (_, {_id, input}) => {
    return await User.findByIdAndUpdate(_id, input, {new: true});
  },
  loginUser: async (_, {input: {name, password}}) => UserService.login(name, password),

  addRoute: async (_, {input}) =>
    RouteService.create(input.userId, input.originId, input.destinationId),

  addBus: async (_, {input}) =>
    BusService.create(
      input.userId,
      input.model,
      input.seatsDownstairs,
      input.seatsUpstairs,
      input.seatType,
    ),

  addJourney: async (_, {input}) =>
    JourneyService.create(
      input.userId,
      input.busId,
      input.routeId,
      input.departure,
      input.arrival,
      input.price,
    ),

  clearDb: async () => {
    await clearDb();
    return true;
  },

  populateSampleData: async () => {
    await populateSampleData();
    return true;
  },
};
