var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var UserSchema = new Schema({
    username: { type: String, unique: true },
    hashed_password: String,
    body_type: String,
    game: {}
});
mongoose.model('User', UserSchema);