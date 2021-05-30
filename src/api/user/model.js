import { Schema, model } from 'mongoose';
import { encrypt } from './utils/bcrypt';

const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    repos: { type: Number, default: 0 }
});

userSchema.pre('save', async function (next) {
    // Hash the password
    this.password = await encrypt(this.password);

    return next();
});

userSchema.pre('findOneAndUpdate', async function (next) {
    if (this._update.password)
        // Hash the password
        this._update.password = await encrypt(this._update.password);

    return next();
});

export default model('User', userSchema);