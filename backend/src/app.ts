import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { userRouter } from './routes/user.router';
import { testRouter } from './routes/test.router';
import cors from 'cors';
import bodyParser from 'body-parser';
import { authRouter } from './routes/auth.router';
import passport from 'passport';
import { jwtStrategyInstance } from './services/passport.service';

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
  })
);

app.use(
  cors({
    // origin: [`${process.env.FRONTEND_EP}`],
    origin: ['https://localhost:3000'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Autorization', 'x-csrf-token'],
    credentials: true,
    maxAge: 600,
    exposedHeaders: ['*', 'Authorization'],
    optionsSuccessStatus: 200,
  })
);

app.use(bodyParser.json());
app.use(passport.initialize());

passport.use(jwtStrategyInstance);

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/test', testRouter);

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World');
});

app.get('/logintest', (_, res: express.Response) => {
  res.cookie('access_token', 'acessToken', {
    expires: new Date(Date.now() + 6000000),
    secure: true,
    httpOnly: true,
    sameSite: 'none',
  });

  res.json({ refreshToken: 'refreshToken' });
});

let a = 0;

app.post('/logintest', (req: express.Request, res: express.Response) => {
  console.log(`logintest access token cookie: ${req.cookies}`);
  console.log(req.headers);

  if (a == 0) {
    res.clearCookie('access_token');
    a++;
    res.status(401).send('Unauthorized');
  } else {
    a = 0;
    res.send('done');
  }
});

app.post('/refreshtest', (req: express.Request, res: express.Response) => {
  const body = req.body;
  // console.log(body);
  // Object.entries(body).forEach((curr) => console.log(curr[0], curr[1]));
  // console.log(`refresh test token: ${body?.refreshToken}`);
  res.send({
    refreshToken: 'refreshToken',
  });
});

app.listen(8080, () => {
  console.log('Started server with 8080');
});
