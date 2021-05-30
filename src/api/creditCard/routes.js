import { Router } from 'express';
import ctrl from './controller';
import { checkCollectionMutation } from './middleware';
import passport from 'passport';

const router = Router();

router.get('/', ctrl.getAll);
router.get('/user', passport.authenticate('local', { failureRedirect: '/api/redirect' }), ctrl.getUserCreditCard);
router.get('/:id', ctrl.getOne);

router.post('/', passport.authenticate('local', { failureRedirect: '/api/redirect' }), ctrl.add);

router.patch('/:id', checkCollectionMutation, ctrl.updateOne);

router.delete('/:id', ctrl.deleteOne);


export default router;