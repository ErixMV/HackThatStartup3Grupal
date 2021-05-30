import { Router } from 'express';
import ctrl from './controller';
import { checkCollectionMutation } from './middleware';

const router = Router();

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);

router.post('/', ctrl.add);

router.patch('/members/:id', ctrl.addMember);
router.patch('/:id', checkCollectionMutation, ctrl.updateOne);

router.delete('/members/:id', ctrl.deleteMember);
router.delete('/:id', ctrl.deleteOne);


export default router;