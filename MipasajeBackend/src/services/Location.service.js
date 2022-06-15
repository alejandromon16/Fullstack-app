import {Location, Route} from '../models';

const getOriginsActive = async () => {
  const ids = await Route.collection.distinct('origin');
  const origins = Location.find({ '_id': { $in: ids } });
  return origins;
}

const getDestinations = async (originId) => {
  const routes = await Route.find({origin: originId});
  const ids = [...routes.map((route) => route.destination)];
  let uniqueIds = [...new Set(ids)];
  const destinations = await Location.find({'_id': { $in: uniqueIds} })
  return destinations;
}

const getById = async (id) => {
  return Location.findById(id);
};

const getAll = async () => {
  return Location.find();
};

const getAvailableDestinations = async (userId, originId) => {
  const routes = await Route.find({user: userId, origin: originId});

  const usedLocations = [originId, ...routes.map((route) => route.destination)];
  const availableLocations = await Location.find({
    _id: {
      $not: {
        $in: usedLocations,
      },
    },
  }).sort({locations:1});

  return availableLocations;
};

const getAvailableOrigin = async (userId) => {
  const routes = await Route.find({user: userId}).sort({locations:1});
  const usedLocations = [...routes.map((route) => route.origin)];
  const availableLocations = await Location.find({
    _id: {
      $not: {
        $in: usedLocations,
      },
    },
  }).sort({locations:1});

  return availableLocations;

}

const create = async (name) => {
  const location = await Location.create({
    name: name,
  });
  return location;
};

export default {
  getById,
  getAll,
  getAvailableDestinations,
  getAvailableOrigin,
  getOriginsActive,
  getDestinations,
  create,
};
