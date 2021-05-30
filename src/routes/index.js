import { Router } from 'express';

import userRoutes from '../api/user/routes';
import repositoryRoutes from '../api/repository/routes';
import teamRoutes from '../api/team/routes';

const router = Router();

router.use('/user', userRoutes);
router.use('/repository', repositoryRoutes);
router.use('/team', teamRoutes);

export default router;