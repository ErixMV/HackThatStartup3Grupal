import { Schema, model } from 'mongoose';

const repositorySchema = new Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String },
    stack: [{ type: String }]
});

export default model('Repository', repositorySchema);