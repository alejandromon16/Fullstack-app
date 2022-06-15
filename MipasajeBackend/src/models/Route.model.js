import {Schema, model, SchemaTypes} from 'mongoose';
import {User, Location} from './index';

const schema = new Schema(
  {
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
    origin: {
      type: SchemaTypes.ObjectId,
      ref: 'Location',
      required: true,
      validate: {
        message: (props) => `Invalid location id: ${props.value}`,
        validator: async (id) => {
          return !!(await Location.findById(id));
        },
      },
    },
    destination: {
      type: SchemaTypes.ObjectId,
      ref: 'Location',
      required: true,
      validate: {
        message: (props) => `Invalid location id: ${props.value}`,
        validator: async (id) => {
          return !!(await Location.findById(id));
        },
      },
    },
  },
  {timestamps: true},
);

schema.index({user: 1, origin: 1, destination: 1});
schema.pre('save', function (next) {
  if (this.origin === this.destination)
    throw new Error('Origin can Destination can not be the same');
  next();
});

export default model('Route', schema);
