module.exports = mongoose => {
    // Create a schema - like blueprint
    const courseSchema = new mongoose.Schema({
        title: { type: String },
        description: { type: String },
        updated: { type: Date },
        game: { type: Boolean },
        path: { type: String }
    });

    const Course = mongoose.model('Course', courseSchema);

    return Course;
}