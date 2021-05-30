import { Schema, model } from 'mongoose';

const teamSchema = new Schema({
    members: [{ type: String }],
    name: { type: String, required: true },
    description: { type: String },
    authorId: { type: String, required: true }
});

export default model('Team', teamSchema);