import passport from 'passport';
import User from '../api/user/model';
import to from 'await-to-js';



passport.serializeUser((validUser, done) => {
    done(null, validUser.id);
});

passport.deserializeUser(async (id, done) => {
    const [err, userFound] = await to(User.find({ _id: id }));

    return err ? done(err) : done(null, userFound);
});

export default passport;