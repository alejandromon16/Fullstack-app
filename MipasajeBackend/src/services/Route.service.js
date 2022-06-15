import {Route} from '../models';

const getById = async (id) => {
  return Route.findById(id);
};


const getAllRoutes = async () => {
  return Route.find();
}

const getByCriteria = async (userId, originId, destinationId) => {
  const critera = {};
  if (userId) critera.user = userId;
  if (originId) critera.origin = originId;
  if (destinationId) critera.destination = destinationId;
  return Route.find(critera);
};

const getId = async (userId, originId, destinationId) => {
  return Route.find({
    user: userId,
    origin: originId,
    destination: destinationId
  })
}

const create = async (userId, originId, destinationId) => {
  return Route.create({
    user: userId,
    origin: originId,
    destination: destinationId,
  });
};

export default {
  getById,
  getId,
  getByCriteria,
  getAllRoutes,
  create,
};
