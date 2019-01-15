module.exports = mongoose => {
    // Create a schema - like blueprint
    const userSchema = new mongoose.Schema({
        FirstName: { type: String },
        LastName: { type: String },
        Username: { type: String },
        Password: { type: String },
        Token: { type: String },
        Role: { type: Number },
        Points: { type: Number },
        Group: { type: String }
    });

    const User = mongoose.model('users', userSchema);

    return User;
}