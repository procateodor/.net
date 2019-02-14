module.exports = mongoose => {
    // Create a schema - like blueprint
    const quizSchema = new mongoose.Schema({
        title: { type: String },
        questions: { type: Array },
        updated: { type: Date, default: Date.now },
        time: { type: String },
        userId: { type: String },
        disciplineId: { type: String },
        pathId: { type: String }
    });

    const Quiz = mongoose.model('quizs', quizSchema);

    return Quiz;
}