import './config';
import express from 'express';

const app: express.Application = express();
const port: string | undefined = process.env.SERVER_PORT;

app.use('/', (req: express.Request, res: express.Response) => {
  return res.send('Hello World!');
});

app.listen(port, () => console.log(`listening on port ${port}`));