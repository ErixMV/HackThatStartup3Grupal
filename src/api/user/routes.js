import { Router } from 'express';
import ctrl from './controller';
import { checkCollectionMutation } from './middleware';
import passport from 'passport';

const router = Router();

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/api/redirect'
}), ctrl.login);
router.post('/register', ctrl.add);

router.get('/', passport.authenticate('local', { failureRedirect: '/api/redirect' }), ctrl.getAll);
router.get('/:id', ctrl.getOne);

router.post('/', ctrl.add);

router.patch('/:id', checkCollectionMutation, ctrl.updateOne);

router.delete('/:id', ctrl.deleteOne);

export default router;