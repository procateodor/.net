module.exports = mongoose => {
    // Create a schema - like blueprint
    const NotificationSchema = new mongoose.Schema({
        userId: { type: String },
        message: { type: String },
        updated: { type: Date, default: Date.now },
        disciplineName: { type: String },
        seen: {
            type: Boolean,
            default: false
        }
    });

    const Notification = mongoose.model('notifications', NotificationSchema);

    return Notification;
}