import './config';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { createItemRoutes } from './item';

(async () => {
  const app: express.Application = express();
  const port: string | undefined = process.env.SERVER_PORT;

  const mongoUrl: string | undefined = process.env.MONGO_URL || ''
  const mongooseConn: mongoose.Mongoose = await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

  app
    .use(bodyParser.json())

    .use('/items', createItemRoutes(mongooseConn))

    .use('/', (req: express.Request, res: express.Response) => {
      return res.send('Hello World!');
    });

  app.listen(port, () => console.log(`listening on port ${port}`));
})()
