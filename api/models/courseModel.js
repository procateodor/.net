module.exports = mongoose => {
    // Create a schema - like blueprint
    const courseSchema = new mongoose.Schema({
        title: { type: String },
        description: { type: String },
        updated: { type: Date, default: Date.now },
        game: { type: Boolean, default: false },
        gameId: {type: String, default: ''},
        path: { type: String },
        disciplineId: { type: String }
    });

    const Course = mongoose.model('Courses', courseSchema);

    return Course;
}