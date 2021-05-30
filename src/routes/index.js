import { Router } from 'express';

import userRoutes from '../api/user/routes';
import repositoryRoutes from '../api/repository/routes';
import teamRoutes from '../api/team/routes';
import creditCardRoutes from '../api/creditCard/routes';

const router = Router();

router.use('/user', userRoutes);
router.use('/repository', repositoryRoutes);
router.use('/team', teamRoutes);
router.use('/card', creditCardRoutes);

router.get('/redirect', (req, res) => res.send('https://google.es'));

export default router;