import PassportLocal from 'passport-local';
import to from 'await-to-js';
import User from '../../api/user/model'
import { compareHash } from '../../api/user/utils/bcrypt';
// const localOpts = {
//     usernameField: 'username',
//     passwordField: 'password'
// }
const Strategy = PassportLocal.Strategy;
export default new Strategy(async (username, password, done) => {
    const [errUser, user] = await to(User.find({ username }));
    if (errUser)
        return done("Error on login");

    const [errPwd, validUser] = await to(compareHash(password, user[0].password));
    if (errPwd)
        return done('Error on login');

    return done(null, user[0]);
});