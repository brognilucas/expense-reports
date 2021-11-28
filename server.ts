/* eslint-disable sort-imports */
import config from 'config';
import context from './middleware/context';
import gracefulShutdown from '@nc/utils/graceful-shutdown';
import helmet from 'helmet';
import Logger from '@nc/utils/logging';
import security from './middleware/security';
import { getConnection } from '@nc/utils/connect';
import { router as expenseRoutes } from '@nc/domain-expense';
import { router as userRoutes } from '@nc/domain-user';

import { createServer as createHTTPServer, Server } from 'http';
import {
  createServer as createHTTPSServer,
  Server as SecureServer,
} from 'https';
import express, {
  NextFunction,
  Request,
  Response,
} from 'express';

const logger = Logger('server');
const app = express();
const server: Server | SecureServer | any =
  config.https.enabled === true
    ? createHTTPSServer(config.https, app as any)
    : createHTTPServer(app as any);
server.ready = false;

gracefulShutdown(server);

app.use(helmet());
app.get('/readycheck', function readinessEndpoint(req: Request, res: Response) {
  const status = server.ready ? 200 : 503;
  res.status(status).send(status === 200 ? 'OK' : 'NOT OK');
});

app.get(
  '/healthcheck',
  function healthcheckEndpoint(req: Request, res: Response) {
    res.status(200).send('OK');
  }
);

app.use(context);
app.use(security);
app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json(err);

  next();
});

server.listen(config.port, async () => {
  await getConnection();

  server.ready = true;
  logger.log(`Server started on port ${config.port}`);
});

export default server;
