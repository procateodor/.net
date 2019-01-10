module.exports = mongoose => {
    // Create a schema - like blueprint
    const disciplineSchema = new mongoose.Schema({
        title: { type: String },
        description: { type: String },
        updated: { type: Date, default: Date.now },
        year: { type: Number },
        credit: { type: Number },
        subscribers: { type: [String] }
    });

    const Discipline = mongoose.model('Discipline', disciplineSchema);

    return Discipline;
}