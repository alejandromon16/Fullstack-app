import {Schema, model, SchemaTypes} from 'mongoose';
import {User} from './index';

const schema = new Schema(
  {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    carnetID: {type: String, required: true},
    unitPrice: {type: Number, required: true},
    quantity: {type: Number, required: true},
    seats: [{type: String, required: true}],
    User: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
      validate: {
        message: (props) => `Invalid client id: ${props.value}`,
        validator: async (id) => {
          return !!(await User.findById(id));
        },
      },
    },
    journey: {type: SchemaTypes.ObjectId, ref: 'Journey', required: true},
  },
  {timestamps: true},
);

schema.index({User: 1, journey: 1});

export default model('Order', schema);
