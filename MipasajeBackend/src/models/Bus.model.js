import {User} from './index';
import {Schema, model, SchemaTypes} from 'mongoose';

const schema = new Schema(
  {
    model: {type: String, required: true},
    seatsDownstairs: {type: Number, required: true, min: 0},
    seatsUpstairs: {type: Number, required: true, min: 0},
    seatType: {type: String, required: true},
    images: [{ url: String}],
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
  },
  {timestamps: true},
);

schema.index({user: 1},{unique: true});

export default model('Bus', schema);
