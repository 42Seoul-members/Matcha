import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

class App {
  app: express.Application;

  constructor() {
    this.app = express();
  }
}

const app = new App().app;

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World');
});

app.listen(8080, () => {
  console.log('Started server with 8080');
});
