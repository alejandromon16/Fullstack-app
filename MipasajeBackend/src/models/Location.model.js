import {Schema, model} from 'mongoose';

const schema = new Schema(
  {
    name: {type: String, required: true, unique: true},
    image: {type: String}
  },
  {timestamps: true},
);

export default model('Location', schema);
