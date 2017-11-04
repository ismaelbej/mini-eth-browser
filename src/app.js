import express from 'express';
import logger from 'morgan';
import cors from 'cors';

import api from './routes/api';

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
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ errors: [err.message] });
});

export default app;
