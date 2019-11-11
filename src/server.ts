import config from '../config';

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger.json';

import { ItemRoutes } from './item';

export default async (): Promise<express.Application> => {
  const port: string = config.serverPort;
  const app: express.Application = express();

  const mongooseConn: mongoose.Mongoose = await mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app
    .use(bodyParser.json())
    .use('/v1/items', ItemRoutes);

  app.listen(port, () => console.log(`listening on port ${port}`));
  return app
}
