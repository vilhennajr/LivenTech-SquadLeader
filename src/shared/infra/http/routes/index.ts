import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello Liven!' });
});

routes.use('/users', usersRouter);

export default routes;
