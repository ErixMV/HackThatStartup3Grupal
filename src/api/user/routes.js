import { Router } from 'express';
import ctrl from './controller';
import { checkCollectionMutation } from './middleware';

const router = Router();

router.post('/login', ctrl.login);
router.post('/register', ctrl.add);

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);

router.post('/', ctrl.add);

router.patch('/:id', checkCollectionMutation, ctrl.updateOne);

router.delete('/:id', ctrl.deleteOne);

export default router;