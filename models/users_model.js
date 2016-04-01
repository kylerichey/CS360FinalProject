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
		gameOutputConsoleEntryCount:  Number,
		player:{
			energy: Number
			//name
		},			
		penny:{ 
			count: Number,
			rate: Number,
			unlocked: Boolean
			},
		pencil:{
			count: Number,
			rate: Number,
			unlocked: Boolean,
			cost : Number				
		},	
		book:{
			count: Number,
			rate: Number,
			unlocked: Boolean,
			cost : Number				
		},
		knowledge:{
			count: Number,
			rate: Number,
			unlocked: Boolean			
		},	
		classes:{
			tabUnlocked: Boolean,
			eng101:{
				count: Number,
				unlocked: Boolean,
				cost: Number,
				studyCost: Number,
				finalCost: Number				
			},
			cs142:{
				count: Number,
				unlocked: Boolean,
				cost: Number,
				studyCost: Number,
				finalCost: Number				
			}
		},
		jobs: {
			tabUnlocked: Boolean,
			pennyRate: Number,
			mcdonalds:{
				hired: Boolean,
				jobListUnlocked: Boolean,
				progress: Number,
				ShiftManagerUnlocked: Boolean,
				ManagerUnlocked: Boolean,
				workingAsBurgerFlipper: Boolean,
				workingAsCashier: Boolean,
				workingAsShiftManager: Boolean,
				workingAsManager: Boolean
			},
			myspace:{
				hired: Boolean,
				unlocked: Boolean,
				jobListUnlocked: Boolean,
				progress: Number,
				seniorDevUnlocked: Boolean,
				ceoUnlocked: Boolean,
				workingAsIntern: Boolean,
				workingAsITSupport: Boolean,
				workingAsSeniorDev: Boolean,
				workingAsCEO: Boolean
			}
		},
		calendar:{
			daysCount: Number,
			yearsCount: Number
		}
	}
});
mongoose.model('User', UserSchema);
