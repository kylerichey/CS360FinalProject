var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var currency = {
        rate: Number,
        count: Number,
        unlocked: Boolean,
        cost: Number
}

var job = {
	count: Number,
	unlocked: Boolean,
	cost: Number,
	studyCost: Number,
	finalCost: Number
}

var UserSchema = new Schema({
    username: { type: String, unique: true },
    hashed_password: String,
    body_type: String,
    game: {
        name: String,
        penny: {__proto__: currency},
        pencil: {__proto__:currency},
        book: {__proto__:currency},
        knowledge: {__proto__:currency},
    	eng101: {__proto__:job},
	cs142: {__proto__:job},
        jobPennyRate: Number,
	jobsTabUnlocked: Boolean
	}
});
mongoose.model('User', UserSchema);
