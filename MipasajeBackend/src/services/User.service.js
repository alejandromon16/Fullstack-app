import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {User} from '../models';
import config from '../lib/config';

const getById = async (id) => {
  return User.findById(id);
};

const getAll = async () => {
  return User.find();
};

const getByRole = async (role) => {
  return User.find({ role: role});
}

const create = async (name, email, password, logo, role) => {
  let encryptedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name: name,
    email: email,
    password: encryptedPassword,
    logo: logo,
    role: role
  });

  const token = jwt.sign({user_id: user._id}, config.KEY_TOKEN, {
    expiresIn: '10h',
  });
  user.token = token;
  await user.save();

  return user;
};

const remove = async (id) => User.findOneAndDelete(id);

const login = async (name, password) => {
  const user = await User.findOne({name});

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({user_id: user._id}, config.KEY_TOKEN, {
      expiresIn: '1h',
    });

    user.token = token;
    await user.save();
    return user;
  } else {
    throw new Error('Contraseno incorrecto o Nombre incorrecto');
  }
};

const getValidToken = async (token) => {
  if (await User.findOne({token})){
    return true
  }
  return false
}

const giveMeRole = async (userId) => {
  const user = await User.findOne({userId})
  return user.role
}

export default {
  getById,
  getAll,
  getByRole,
  giveMeRole,
  create,
  remove,
  login,
  getValidToken
};
