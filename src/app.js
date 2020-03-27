import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import http from 'http';
import socketIo from 'socket.io';
import api from './routes/api';
import contracts from './controllers/Contracts';
import ethereum from './lib/ethereum';

export function createApp() {
  const app = express();

  app.use(logger('dev'));
  app.use(cors());

  app.use('/api/v1', api);

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ errors: [err.message] });
  });

  return app;
}

export async function createServer(app, config) {
  await contracts.initialize(config);
  const eventEmitter = await ethereum.initialize(config);
  const server = http.createServer(app);
  const io = socketIo(server);
  io.on('connect', (socket) => {
    console.log('New client', socket.id);
    eventEmitter.on('newBlock', (block) => {
      socket.emit('newBlock', block.number);
    });
    socket.on('disconnect', () => {
      console.log('Client disconnected', socket.id);
    });
  });
  server.listen(config.port || 5000);
  return server;
}
