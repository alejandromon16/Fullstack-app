import {Schema, model} from 'mongoose';

const schema = new Schema(
  {
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    logo: {type: String},
    token: {type: String},
    role: {type: String, required: true}
  },
  {timestamps: true},
);

export default model('User', schema);
