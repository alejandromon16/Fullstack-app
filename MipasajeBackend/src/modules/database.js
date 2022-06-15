import mongoose from 'mongoose';
import dotenv from 'dotenv';

const config = dotenv.config().parsed;

export async function connectToDb() {
  await mongoose.connect(getMongoUrl());
  console.log('Connected to MongoDB');
}

function getMongoUrl() {
  if (!config) {
    throw new Error('MongoDB config missing');
  }
  if (config.MONGODB_URL) {
    return config.MONGODB_URL;
  } else {
    return `${config.MONGODB_PROTOCOL}://${config.MONGODB_USER}:${config.MONGODB_PASS}@${config.MONGODB_SERVER}/${config.MONGODB_DB}?retryWrites=true&w=majority`;
  }
}
