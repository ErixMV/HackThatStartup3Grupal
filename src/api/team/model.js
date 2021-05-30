import { Schema, model } from 'mongoose';

const teamSchema = new Schema({
    members: [{ type: String }],
    name: { type: String, required: true },
    description: { type: String }
});

export default model('Team', teamSchema);