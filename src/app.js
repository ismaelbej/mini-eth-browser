import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import http from 'http';
import api from './routes/api';
import { initialize as initializeContracts } from './controllers/Contracts';
import { initialize as initializeEthereum } from './lib/ethereum';

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
  await initializeContracts(config);
  await initializeEthereum(config);
  const server = http.createServer(app);
  server.listen(config.port || 5000);
  return server;
}
