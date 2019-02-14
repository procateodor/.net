module.exports = mongoose => {
    // Create a schema - like blueprint
    const commentSchema = new mongoose.Schema({
        description: { type: String },
        updated: { type: Date, default: Date.now },
        disciplineId: { type: String },
        userId: { type: String },
        name: { type: String }
    });

    const Comment = mongoose.model('comments', commentSchema);

    return Comment;
}