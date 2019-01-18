module.exports = mongoose => {
    // Create a schema - like blueprint
    const NotificationSchema = new mongoose.Schema({
        userId: { type: String },
        message: { type: Array },
        updated: { type: Date, default: Date.now },
        disciplineName: { type: String }
    });

    const Notification = mongoose.model('notifications', NotificationSchema);

    return Notification;
}