import config from '../config';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { ItemRoutes } from './item';

(async () => {
  const app: express.Application = express();
  const port: string | undefined = config.serverPort;

  const mongoUrl: string = config.mongoUrl;
  const mongooseConn: mongoose.Mongoose = await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

  app
    .use(bodyParser.json())

    .use('/items', ItemRoutes)

    .use('/', (req: express.Request, res: express.Response) => {
      return res.send('Hello World!');
    });

  app.listen(port, () => console.log(`listening on port ${port}`));
})()
