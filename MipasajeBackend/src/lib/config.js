import dotenv from 'dotenv';

dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV || 'production',
  KEY_TOKEN: process.env.KEY_TOKEN || '123',
};
