/*
 * Copyright by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Business Source License v1.1
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import Express from 'express';

import { lookupAccessTokenRouter } from './routes/auth-routes';
import { githubApiRouter } from './routes/github-routes';
import { manifestPresignerRouter } from './routes/manifest-presigner';
import { sbomPresignerRouter } from './routes/sbom-presigner';

const app = Express();
app.use(cors());
app.use(Express.json());

app.get('/health', (_req: Express.Request, res: Express.Response) => {
  res.send({
    status: 'ok',
  });
});

app.use(Express.json());

if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log('REQUEST RECEIVED ', req.path);
    console.log('WITH BODY: ', req.body);
    next();
  });
}

app.get('/', (_req: Express.Request, res: Express.Response) => {
  res.send('Hello World!');
});

app.use(manifestPresignerRouter);
app.use(sbomPresignerRouter);
app.use(lookupAccessTokenRouter);
app.use(githubApiRouter);
export { app };
