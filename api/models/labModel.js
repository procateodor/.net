module.exports = mongoose => {
    // Create a schema - like blueprint
    const labSchema = new mongoose.Schema({
        title: { type: String },
        description: { type: String },
        updated: { type: Date },
        game: { type: Boolean },
        path: { type: String }
    });

    const Lab = mongoose.model('Lab', labSchema);

    return Lab;
}