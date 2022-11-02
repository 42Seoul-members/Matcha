import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { userRouter } from './routes/user.router';
import { testRouter } from './routes/test.router';
import bodyParser from 'body-parser';

class App {
  app: express.Application;

  constructor() {
    this.app = express();
  }
}

const app = new App().app;

const swaggerSpec = swaggerJsdoc({
  failOnErrors: true,
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'matcha',
      version: '0.0.1',
      description: 'matcha dev api',
    },
    host: 'localhost:8080',
    basePath: '/',
  },
  apis: ['/app/src/routes/*'],
});

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
  }),
);

app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/test', testRouter);

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World');
});

app.listen(8080, () => {
  console.log('Started server with 8080');
});
