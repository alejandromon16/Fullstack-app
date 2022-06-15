import {Journey, Route} from '../models';
import Mongoose from 'mongoose';

const getById = async (id) => Journey.findById(id);

const getByRouteId = async (routeId) => Journey.find({route: routeId}, {}, {sort: {departure: 1}});

const getAll = async () => Journey.find();

const getByCriteria = async ({
  originId,
  destinationId,
  userId,
  departsBefore,
  departsAfter,
  arrivesBefore,
  arrivesAfter,
}) => {
  const critera = {};
  if (userId) critera.user = new Mongoose.Types.ObjectId(userId);
  if (departsBefore) critera.departure = {$lte: departsBefore};
  if (departsAfter) critera.departure = {$gte: departsAfter};
  if (arrivesBefore) critera.arrival = {$lte: arrivesBefore};
  if (arrivesAfter) critera.arrival = {$gte: arrivesAfter};

  if (destinationId){
    const journeys = await Journey.aggregate([
      {
        $lookup: {
          from: Route.collection.name,
          localField: 'route',
          foreignField: '_id',
          as: 'Route',
        },
      },
  
      {
        $match: {
          'Route.origin': new Mongoose.Types.ObjectId(originId),
          'Route.destination': new Mongoose.Types.ObjectId(destinationId),
          ...critera,
        },
      },
  
      {
        $sort: {
          departure: 1,
        },
      },
    ]);

    return journeys;
    
  }else{
    const journeys = await Journey.aggregate([
      {
        $lookup: {
          from: Route.collection.name,
          localField: 'route',
          foreignField: '_id',
          as: 'Route',
        },
      },
  
      {
        $match: {
          'Route.origin': new Mongoose.Types.ObjectId(originId),
          ...critera,
        },
      },
  
      {
        $sort: {
          departure: 1,
        },
      },
    ]);

    return journeys;
  }
  
};

const create = async (userId, busId, routeId, departure, arrival, price) => {
  return Journey.create({
    user: userId,
    bus: busId,
    route: routeId,
    departure,
    arrival,
    price,
  });
};

const getAllById = (userId) => {
  return Journey.find({userId});
}

export default {
  getById,
  getByRouteId,
  getAllById,
  getByCriteria,
  getAll,
  create,
};
