import {
  LocationService,
  UserService,
  RouteService,
  BusService,
  JourneyService,
} from '../services';

export default {
  locations: async () => LocationService.getAll(),
  availableDestinationsForOrigin: async (_, args) =>
    LocationService.getAvailableDestinations(args.userId, args.originId),
  availableOrigin: async (_, args) =>
    LocationService.getAvailableOrigin(args.userId),

  user: async (_, args) => UserService.getById(args.id),
  users: async () => UserService.getAll(),
  usersByRole: async (_, args) => UserService.getByRole(args.role),

  destinations: async (_,{originId}) => LocationService.getDestinations(originId),
  origins: async () => LocationService.getOriginsActive(),

  allRoutes: async () => RouteService.getAllRoutes(),
  route: async (_, args) => RouteService.getById(args.id),
  routeGiveID: async (_,args) => RouteService.getId(args.userId, args.originId, args.destinationId),
  routes: async (_, args) =>
    RouteService.getByCriteria(args.userId, args.originId, args.destinationId),
    

  bus: async (_, args) => {
    return BusService.getById(args.id);
  },
  allBuses: async () => {
    return BusService.getAll();
  },
  buses: async (_, args) => BusService.getByCriteria(args.userId, args.identifier),
  isBusAvailable: async (_, args) => BusService.isBusAvailable(args.busId, args.from, args.to),

  journey: async (_, {id}) => JourneyService.getById(id),
  journeysByRouteId: async (_, {routeId}) => JourneyService.getByRouteId(routeId),
  journeys: async (_, args) =>
    JourneyService.getByCriteria({
      originId: args.originId,
      destinationId: args.destinationId,
      userId: args.userId,
      departsBefore: args.departsBefore,
      departsAfter: args.departsAfter,
      arrivesBefore: args.arrivesBefore,
      arrivesAfter: args.arrivesAfter,
    }),
  journeysByUserId: async (_, {userId}) => JourneyService.getAllById(userId),
  allJourneys: async () => JourneyService.getAll(),
  validToken: async (_, {token}) => UserService.getValidToken(token),
  giveMeRole: async (_,{userId}) => UserService.giveMeRole(userId),
};
