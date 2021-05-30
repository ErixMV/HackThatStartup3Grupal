import { Schema, model } from 'mongoose';

const creditSchema = new Schema({
    credits: { type: Number, default: 0 },
    name: { type: String, required: true },
    userId: { type: String, required: true },
    number: { type: Number, required: true },
    expDate: { type: Date, required: true }

});

export default model('CreditCard', creditSchema);