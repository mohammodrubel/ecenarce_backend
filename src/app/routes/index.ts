import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { userRouter } from '../modules/user/user.router';
import { categoryRouter } from '../modules/category/category.route';

const router = express.Router();

type Route = {
    path: string;
    route: express.Router;
};

const routes: Route[] = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: userRouter,
  },
  {
    path: '/category',
    route: categoryRouter,
  },
];

routes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;