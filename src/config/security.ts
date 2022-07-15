import {CorsOptions} from 'cors';

const env = require('dotenv');
env.config();

export const corsOptions : CorsOptions = {
  origin: process.env.cors
};
