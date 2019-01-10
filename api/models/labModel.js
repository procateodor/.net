const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const labModel = new Schema({
    title: { type: String },
    description: { type: String },
    updated: { type: Date },
    game: { type: Boolean },
    path: { type: String }
});

export default mongoose.model('Lab', labModel);