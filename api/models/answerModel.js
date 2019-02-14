module.exports = mongoose => {
    // Create a schema - like blueprint
    const answerSchema = new mongoose.Schema({
        userId: { type: String },
        responses: { type: Array },
        updated: { type: Date, default: Date.now },
        quizId: { type: String },
        disciplineId: {type: String}
    });

    const Answer = mongoose.model('answers', answerSchema);

    return Answer;
}