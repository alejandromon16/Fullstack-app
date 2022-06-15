import {Bus, Journey} from '../models';

const getAll = async () => {
  return Bus.find();
};

const getById = async (id) => {
  return Bus.findById(id);
};

const getByCriteria = async (userId, identifier) => {
  const critera = {};
  if (userId) critera.user = userId;
  if (identifier) critera.identifier = identifier;
  return Bus.find(critera);
};

const create = async (userId, model, seatsDownstairs, seatsUpstairs, seatType) => {

  return Bus.create({
    user: userId,
    model: model,
    seatsDownstairs: seatsDownstairs,
    seatsUpstairs: seatsUpstairs,
    seatType: seatType,
  });
};

const isBusAvailable = async (busId, from, to) => {
  const journeys = await Journey.find({
    bus: busId,
    $or: [
      {departure: {$gt: from, $lt: to}},
      {arrival: {$gt: from, $lt: to}},
      {departure: {$lt: from}, arrival: {$gt: to}},
    ],
  });

  console.log(journeys.length);
  return journeys.length === 0;
};

export default {
  getAll,
  getById,
  getByCriteria,
  create,
  isBusAvailable,
};
