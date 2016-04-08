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
    gender: String,
    
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
		chocolate:{
			count: Number,
			rate: Number,
			unlocked: Boolean			
		},	
		energyDrink:{
			count: Number,
			rate: Number,
			unlocked: Boolean			
		},	
		flower:{
			count: Number,
			rate: Number,
			unlocked: Boolean			
		},
		gatorade:{
			count: Number,
			rate: Number,
			unlocked: Boolean			
		},
		yogaMat:{
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
		relationships:{
				girlfriend1:{
					name: String,
					unlocked: Boolean,
					progress: Number,
					level: Number,
					tooltip: String,
					arrayIndex: Number,
				}
			},
		calendar:{
			daysCount: Number,
			yearsCount: Number
		}
	}
	//game object over
});
mongoose.model('User', UserSchema);
