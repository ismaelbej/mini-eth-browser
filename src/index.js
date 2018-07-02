import { createApp, createServer } from './app';
import config from './config';

createServer(createApp(), config);
