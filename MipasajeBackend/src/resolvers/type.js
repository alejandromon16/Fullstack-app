import {LocationService, UserService, RouteService, BusService} from '../services';

const typeResolvers = {
  User: {},

  Route: {
    user: async (parent) => UserService.getById(parent.user),
    origin: async (parent) => LocationService.getById(parent.origin),
    destination: async (parent) => LocationService.getById(parent.destination),
  },

  Bus: {
    user: async (parent) => UserService.getById(parent.user),
  },

  Journey: {
    user: async (parent) => UserService.getById(parent.user),
    route: async (parent) => RouteService.getById(parent.route),
    bus: async (parent) => BusService.getById(parent.bus),
  },
};

export default typeResolvers;
