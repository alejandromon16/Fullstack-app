import {Bus, User, Route} from './index';
import {Schema, model, SchemaTypes} from 'mongoose';

const schema = new Schema(
  {
    price: {type: Number, required: true, min: 0},
    departure: {type: Date, required: true},
    arrival: {type: Date, required: true},
    bus: {
      type: SchemaTypes.ObjectId,
      ref: 'bus',
      required: true,
      validate: {
        message: (props) => `Invalid bus id: ${props.value}`,
        validator: async (id) => {
          return !!(await Bus.findById(id));
        },
      },
    },
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
      validate: {
        message: (props) => `Invalid user id: ${props.value}`,
        validator: async (id) => {
          return !!(await User.findById(id));
        },
      },
    },
    route: {
      type: SchemaTypes.ObjectId,
      ref: 'Route',
      required: true,
      validate: {
        message: (props) => `Invalid route id: ${props.value}`,
        validator: async (id) => {
          return !!(await Route.findById(id));
        },
      },
    },
  },
  {timestamps: true},
);

schema.index({departure: 1, arrival: 1, user: 1, bus: 1}, {unique: true});
schema.index({user: 1});

export default model('Journey', schema);
