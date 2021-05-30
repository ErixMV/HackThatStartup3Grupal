import { Router } from 'express';

import userRoutes from '../api/user/routes';
import repositoryRoutes from '../api/repository/routes';

const router = Router();

router.use('/user', userRoutes);
router.use('/repository', repositoryRoutes);

export default router;