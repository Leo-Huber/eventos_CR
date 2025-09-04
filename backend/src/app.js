const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const env = require('./config/env');
const { notFound, errorHandler } = require('./middlewares/error');

const health = require('./routes/health');
const dbcheck = require('./routes/dbcheck');
const productos = require('./routes/productos');
const banners = require('./routes/banners');

const app = express();
app.use(helmet());
app.use(cors({ origin: env.corsOrigin }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

app.use('/api', health);
app.use('/api', dbcheck);
app.use('/api', productos);
app.use('/api', banners);

app.use(notFound);
app.use(errorHandler);


module.exports = app;
