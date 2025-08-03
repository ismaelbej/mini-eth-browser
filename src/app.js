import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import http from 'http';
import swaggerUi from 'swagger-ui-express';
import api from './routes/api.js';
import { swaggerDocument } from './swagger.js';

export function createApp(web3) {
  const app = express();

  app.use(logger('dev'));
  app.use(cors());

  // Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use('/api/v1', api(web3));

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
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

export async function createServer(app, port) {
  const server = http.createServer(app);
  server.listen(port);
  return server;
}
