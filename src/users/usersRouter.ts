import { Router } from 'express';
import UsersController from './controllers/UsersController';
import JsonUsersRepository from './repositories/implementations/JsonUsersRepository';
import UsersServices from './services';

const jsonUsersRepository = new JsonUsersRepository(
  `${__dirname}/../../data/users.json`
);

const usersServices = new UsersServices(jsonUsersRepository);
const usersController = new UsersController(usersServices);

const router = Router();

router.post('/users/signUp', (request, response) => {
  return usersController.createUser(request, response);
});

router.post('/users/signIn', (request, response) => {
  return usersController.signIn(request, response);
});

export default router;
