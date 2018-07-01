import { createServer, createApp } from './app';
import config from './config';

createServer(createApp(), config);
