/*
Core game play JavaScript
	* Tick Counter	
	* Misc Functions
		* Auto Screen Refresh
		* Timestamps
		* Console Output
		* Player Name / Status
	* Base currencies
		* Penny
		* Pencil
		* Book
	* Classes
		* English 101
		* CS 142
	* Jobs
		* Burger Flipper
	*Dynamic Html Generator List
		* Self
		* Classes
		* Jobs
*/


angular.module('studentGame', []) 
.controller('coreController', [ 
'$scope','$http', 
function($scope,$http){ 

	/* ******************************************
	******** * Game Object	********************
	*********************************************/
	$scope.game = {};
	
	$scope.game={
			gameOutputConsoleEntryCount:  0,
			player:{
				energy: 50,
				//name
			},			
			penny:{ 
				count: 0,
				rate: 0,
				unlocked: true,
				},
			pencil:{
				count: 0,
				rate: 0,
				unlocked: false,
				cost : 10,				
			},	
			book:{
				count: 0,
				rate: 0,
				unlocked: false,
				cost : 20,				
			},
			knowledge:{
				count: 0,
				rate: 0,
				unlocked: false,			
			},	
			classes:{
				tabUnlocked: false,
				eng101:{
					count: 0,
					unlocked: true,
					cost: 3,
					studyCost: 2,
					finalCost: 10,				
				},
				cs142:{
					count: 0,
					unlocked: false,
					cost: 10,
					studyCost: 5,
					finalCost: 15,				
				},
			},
			jobs: {
				tabUnlocked: false,
				pennyRate: 0,
				mcdonalds:{
					hired: false,
					jobListUnlocked: false,
					progress: 0,
					ShiftManagerUnlocked: false,
					ManagerUnlocked: false,
					workingAsBurgerFlipper: false,
					workingAsCashier: false,
					workingAsShiftManager: false,
					workingAsManager:false,
				},
				myspace:{
					hired: false,
					unlocked: false,
					jobListUnlocked: false,
					progress: 0,
					seniorDevUnlocked: false,
					ceoUnlocked: false,
					workingAsIntern: false,
					workingAsITSupport: false,
					workingAsSeniorDev: false,
					workingAsCEO:false,
				},
			},
			calendar:{
				daysCount: $scope.daysSinceYear,
				yearsCount: (new Date().getFullYear()),
			},
		};
	
	$scope.initGame = function() {
		$scope.game={
			gameOutputConsoleEntryCount:  0,
			player:{
				energy: 50,
				//name
			},			
			penny:{ 
				count: 0,
				rate: 0,
				unlocked: true,
				},
			pencil:{
				count: 0,
				rate: 0,
				unlocked: false,
				cost : 10,				
			},	
			book:{
				count: 0,
				rate: 0,
				unlocked: false,
				cost : 20,				
			},
			knowledge:{
				count: 0,
				rate: 0,
				unlocked: false,			
			},	
			classes:{
				tabUnlocked: false,
				eng101:{
					count: 0,
					unlocked: true,
					cost: 3,
					studyCost: 2,
					finalCost: 10,				
				},
				cs142:{
					count: 0,
					unlocked: false,
					cost: 10,
					studyCost: 5,
					finalCost: 15,				
				},
			},
			jobs: {
				tabUnlocked: false,
				pennyRate: 0,
				mcdonalds:{
					hired: false,
					jobListUnlocked: false,
					progress: 0,
					ShiftManagerUnlocked: false,
					ManagerUnlocked: false,
					workingAsBurgerFlipper: false,
					workingAsCashier: false,
					workingAsShiftManager: false,
					workingAsManager:false,
				},
				myspace:{
					hired: false,
					unlocked: false,
					jobListUnlocked: false,
					progress: 0,
					seniorDevUnlocked: false,
					ceoUnlocked: false,
					workingAsIntern: false,
					workingAsITSupport: false,
					workingAsSeniorDev: false,
					workingAsCEO:false,
				},
			},
			calendar:{
				daysCount: $scope.daysSinceYear,
				yearsCount: (new Date().getFullYear()),
			},
		};
	};



	/* ******************************************
	******** * Tick Counter	********************
	*********************************************/
	$scope.updateJobProgressBars = function (){
		//mcdonalds
		if($scope.game.jobs.mcdonalds.workingAsBurgerFlipper && $scope.game.jobs.mcdonalds.progress <= 100){			
			$scope.game.jobs.mcdonalds.progress += 0.02;
			};
		if($scope.game.jobs.mcdonalds.workingAsCashier && $scope.game.jobs.mcdonalds.progress <= 100){			
			$scope.game.jobs.mcdonalds.progress += 0.04;
			};
		if($scope.game.jobs.mcdonalds.workingAsShiftManager && $scope.game.jobs.mcdonalds.progress <= 100){			
			$scope.game.jobs.mcdonalds.progress += 0.08;
			};		
		if(!$scope.game.jobs.mcdonalds.ShiftManagerUnlocked && $scope.game.jobs.mcdonalds.progress >= 33 ){
				$scope.game.jobs.mcdonalds.ShiftManagerUnlocked = true;
			};	
		if(!$scope.game.jobs.mcdonalds.ManagerUnlocked && $scope.game.jobs.mcdonalds.progress >= 67 ){
				$scope.game.jobs.mcdonalds.ManagerUnlocked = true;
			};				
		if($scope.game.jobs.mcdonalds.progress > 100){
			$scope.game.jobs.mcdonalds.progress = 100;
		};
		
		//myspace
		
		if($scope.game.jobs.myspace.workingAsIntern && $scope.game.jobs.myspace.progress <= 100){			
			$scope.game.jobs.myspace.progress += 0.02;
		};
		if($scope.game.jobs.myspace.workingAsITSupport && $scope.game.jobs.myspace.progress <= 100){			
			$scope.game.jobs.myspace.progress += 0.04;
		};
		if($scope.game.jobs.myspace.workingAsSeniorDev && $scope.game.jobs.myspace.progress <= 100){			
			$scope.game.jobs.myspace.progress += 0.08;
		};		
		if(!$scope.game.jobs.myspace.seniorDevUnlocked && $scope.game.jobs.myspace.progress >= 33 ){
				$scope.game.jobs.myspace.seniorDevUnlocked = true;
			};			
		if(!$scope.game.jobs.myspace.ceoUnlocked && $scope.game.jobs.myspace.progress >= 67 ){
				$scope.game.jobs.myspace.ceoUnlocked = true;
			};				
		if($scope.game.jobs.myspace.progress > 100){
			$scope.game.jobs.myspace.progress = 100;
		};
	};
	
	$scope.firstInit = false;	

	var tickTimerVar = setInterval(tickTimer, 100);		
	function tickTimer() {
		if (!$scope.firstInit) {
			$scope.loadUserState();
			$scope.firstInit = true;
		}
		
		$scope.game.penny.rate = $scope.game.jobs.pennyRate;  //if need to add new way to get penny add here
		$scope.game.penny.count =  $scope.game.penny.count + $scope.game.penny.rate;	
		$scope.game.knowledge.count = $scope.game.knowledge.count + $scope.game.knowledge.rate;
		
		$scope.updateJobProgressBars();		
	};
	/* ******************************************
	******** * Misc Functions ******************	
	*********************************************/	
	
	// Auto Screen Refresh, 1 second
	var updateScreenAutoRefresh = setInterval(updateScreenAuto, 1000);
	function updateScreenAuto() {		
	  $scope.$apply(function () {
		   // Updates the screen every second without any user clicking		  
			});
			if($scopeCurrentlySavingGameClick){
				$scopeCurrentlySavingGameClick=false;
			}
		};
	
	// Day Counter
	var updateScreenDayTimer = setInterval(updateScreenDay, 10000);
	function updateScreenDay() {		
		$scope.game.calendar.daysCount += 1;			
		$scope.game.player.energy+=25;
		if($scope.game.player.energy>100) {
			$scope.game.player.energy= 100;	
			}		
	};
	
		// AutoSave On
	var updateScreenSaveTimerOn = setInterval(updateScreenSaveOn, 60000);
	function updateScreenSaveOn() {		
			$scopeCurrentlySavingGame = true;
			//save game
			$scope.saveUserState();
			$scope.addEntryToConsole("AutoSaving");
	};
	
			// AutoSave Off 
	var updateScreenSaveTimerOff = setInterval(updateScreenSaveOff, 61500);
	function updateScreenSaveOff() {		
			$scopeCurrentlySavingGame = false;
			
	};
	
	$scope.clearUserState = function() {
		
		$http.post("/users/update", {withCredentials:true, game: {}})
		.then(
			function success(data) {
				$scope.initGame();
				console.log("User data cleared");		
			},
			function error(err) {
				console.log("ERROR in clearing user state");
				console.log(err);
			}
		);
		
	}
	
	$scope.saveUserStateOnClick = function (){
		$scope.addEntryToConsole("Game Saved");
		$scope.saveUserState();
	};

	// Save user state to DB
	$scope.saveUserState = function() {	
		$scopeCurrentlySavingGameClick = true;
		$http.post("/users/update", {withCredentials: true, game: $scope.game})
		.then(
			function success(data) {
				console.log("SUCCESS");
				console.log(data);
				
			},
			function error(err) {
				console.log("ERROR");
				console.log(err);
				$scope.addEntryToConsole("Game NOT Saved");
			}
		);
		//$scopeCurrentlySavingGame = false;
		
	}
	
	$scope.loadUserState = function() {
		$scope.todaysDateInDays();
		$http.get("/users/me", {withCredentials:true})
		.then(
			function success(data) {
				if ((typeof data.data.game != 'undefined') && (typeof data.data.game[0] != undefined)) {
					$scope.game = data.data.game;
				}else {
					console.log("User has no DB entry");
				}
			},
			function error(err) {
				console.log("ERROR in loading user state");
				console.log(err);
			}
		)
	}

		$scope.daysSinceYear = 0;
		$scope.todaysDateInDays = function (){
			
			switch (new Date().getMonth()) {
				case 0:
					$scope.daysSinceYear =0;
					break;
				case 1:
					$scope.daysSinceYear =31;
					break;
				case 2:
					$scope.daysSinceYear = 59;
					break;
				case 3:
					$scope.daysSinceYear = 90;
					break;
				case 4:
					$scope.daysSinceYear = 120;
					break;
				case 5:
					$scope.daysSinceYear = 151;
					break;
				case 6:
					$scope.daysSinceYear = 181;
					break;
				case 7:
					$scope.daysSinceYear = 212;
					break;
				case 8:
					$scope.daysSinceYear = 243;
					break;
				case 9:
					$scope.daysSinceYear=273;
					break;
				case 10:
					$scope.daysSinceYear = 304;
					break;
				case 11:
					$scope.daysSinceYear = 334;
					break;
			}
			
			$scope.daysSinceYear += (new Date().getDate());
			$scope.game.calendar.daysCount = $scope.daysSinceYear;
			//console.log($scope.daysSinceYear);
			//return $scope.daysSinceYear;
			
		};

	//TimeStamp
	// Gets time for console timestamps output
	$scope.getDatetime = function() {
		var today = new Date();	
		console.log($scope.daysSinceYear);
		return today.getHours() +":"+ ((today.getMinutes() < 10)?"0":"") +today.getMinutes() + ":"+ ((today.getSeconds() < 10)?"0":"") + today.getSeconds();	
		};

	// Write to user console
	//Easy function to call to add text to user console
	
	$scope.addEntryToConsole = function(contentText){
		$scope.game.gameOutputConsoleEntryCount +=  +1;
		$scope.gameOutputConsoleList.push({content:contentText, number:$scope.game.gameOutputConsoleEntryCount,timestamp:$scope.getDatetime()}); 	
		};
		//Default user console value
		$scope.gameOutputConsoleList = [
			{content:'You are a poor student wandering through college', number:0, timestamp:$scope.getDatetime()}, 		
		];
		
		$scope.playerGender = "male";
	
	//  : Get Player name from database
	$http.get("/users/me", {withCredentials: true})
	.then(
		function success(data) {
			console.log(data);
			user = data.data;
			$scope.playerName = user.username;			
			$scope.playerGender = user.gender;
			//console.log($scope.playerGender);
			
			if($scope.playerGender == "male")
			{
				$scope.playerGenderMale = true;
			}
			else{
				$scope.playerGenderMale =false;
			}
		}, 
		function error(err) {
			console.log(err);
			$scope.playerName = "ERROR! Check the console";
			$scope.playerBodyLevel = "ERROR!";
		}
	);
	
	$scope.getPlayerName = function(){
		return $scope.playerName;
	};	

	$scope.getPlayerGender = function (){
		return $scope.getPlayerGender;
	}

	
	//growth function
	$scope.globalCostGrowthRate = 0.05;
	
	
	
		/* ******************************************
	******** * Free Resources	*****************
	*********************************************/

		
	$scope.giveFreePenny = function (){
		$scope.game.penny.count += 10000;
		$scope.game.pencil.count += 10000;
		$scope.game.book.count += 10000;	
		$scope.game.book.unlocked = true;
		$scope.game.knowledge.unlocked = true;
		$scope.game.knowledge.count += 10000;
		$scope.game.pencil.unlocked= true;
		$scope.game.classes.cs142.unlocked = true;
		$scope.game.classes.tabUnlocked = true;
		$scope.game.jobs.tabUnlocked= true;
		$scope.game.jobs.myspace.unlocked = true;
		
	};
	
		/* ******************************************
	******** * Calendar	*****************
	*********************************************/
	
	$scope.game.calendar.yearsCount = 2016;
	
		$scope.getDateName = function (){
		return "Date";
	};
	
	
	$scope.getDate = function(){
		if($scope.game.calendar.daysCount<=31){
			return "January " + $scope.game.calendar.daysCount + " " + $scope.game.calendar.yearsCount;
		}
		else if ($scope.game.calendar.daysCount<=59)
		{
			return "February " + ($scope.game.calendar.daysCount - 31) + " " + $scope.game.calendar.yearsCount;
		}
		else if ($scope.game.calendar.daysCount<=90)
		{
			return "March " + ($scope.game.calendar.daysCount - 59)+ " " +$scope.game.calendar.yearsCount;
		}
		else if ($scope.game.calendar.daysCount<=120)
		{
			return "April " + ($scope.game.calendar.daysCount - 90)+" " + $scope.game.calendar.yearsCount;
		}
		else if ($scope.game.calendar.daysCount<=151)
		{
			return "May " + ($scope.game.calendar.daysCount - 120)+ " " +$scope.game.calendar.yearsCount;
		}
		else if ($scope.game.calendar.daysCount<=181)
		{
			return "June " + ($scope.game.calendar.daysCount - 151)+ " " +$scope.game.calendar.yearsCount;
		}
		else if ($scope.game.calendar.daysCount<=212)
		{
			return "July " + ($scope.game.calendar.daysCount - 181)+ " " +$scope.game.calendar.yearsCount;
		}
		else if ($scope.game.calendar.daysCount<=243)
		{
			return "August " + ($scope.game.calendar.daysCount - 212)+ " " +$scope.game.calendar.yearsCount;
		}
		else if ($scope.game.calendar.daysCount<=273)
		{
			return "September " + ($scope.game.calendar.daysCount - 243)+ " " +$scope.game.calendar.yearsCount;
		}
		else if ($scope.game.calendar.daysCount<=304)
		{
			return "October " + ($scope.game.calendar.daysCount - 273)+ " " +$scope.game.calendar.yearsCount;
		}
		else if ($scope.game.calendar.daysCount<=334)
		{
			return "November " + ($scope.game.calendar.daysCount - 304)+" " + $scope.game.calendar.yearsCount;
		}
		else if ($scope.game.calendar.daysCount<=365)
		{
			return "December " + ($scope.game.calendar.daysCount - 304)+ " " +$scope.game.calendar.yearsCount;
		}
		else{
			$scope.game.calendar.daysCount=1;
			$scope.game.calendar.yearsCount += 1;
			
		}
	}
		
	/* ******************************************
	******** *Energy	*****************
	*********************************************/	
	
	
	
	$scope.getPlayerEnergy = function (){
		return $scope.game.player.energy;
	};
	
	
		/* ******************************************
	******** * Save Function	*****************
	*********************************************/
	$scopeCurrentlySavingGame = false;
	$scopeCurrentlySavingGameClick = false;
	
	$scope.getSaveButtonText = function (){
		if($scopeCurrentlySavingGame){
			return "Autosaving";
		}else if($scopeCurrentlySavingGameClick){
			return "Saving";
		}else{
			return "Save Game";
		}
		
	};
	
	$scope.saveButtoncolorCondition = function (){
		if($scopeCurrentlySavingGame || $scopeCurrentlySavingGameClick){
			return "btn-success";
		}else{
			return "btn-primary";
		}		
	};
	
	
	/* ******************************************
	******** * Base Currencies	*****************
	*********************************************/	
	
	
	/* ******************************************
	******** *Penny		************************
	*********************************************/	
	
	
	

	$scope.increasePennyCount = function() {
		$scope.game.penny.count +=1;
		if($scope.game.penny.count>=10){
			$scope.game.pencil.unlocked = true;				
		}			
	};
	
	$scope.getPennyRate = function(){
		return  Math.round($scope.game.penny.rate *1000)/100;	
	};
	
	$scope.getPennyCount = function(){		
		return Math.round($scope.game.penny.count *100)/100;	
	};
	
	$scope.pennyColorConditions = function (){
		return "btn-primary";
	};
	
	

	

	
	/* ******************************************
	******** *Pencil   ************************
	*********************************************/		
	
	$scope.increasePencilCount = function() {				
		if($scope.game.penny.count>= $scope.game.pencil.cost){					
			$scope.game.penny.count = $scope.game.penny.count - $scope.game.pencil.cost;
			$scope.game.pencil.count = $scope.game.pencil.count + 1;
			$scope.game.pencil.cost = Math.round($scope.game.pencil.cost + ($scope.globalCostGrowthRate * $scope.game.pencil.cost));  //calculate new cost			
			if(!$scope.game.book.unlocked){
				$scope.game.book.unlocked =true;
			}
		}
		else{		
			$scope.addEntryToConsole("Not enough penny to buy pencil");				 
		}			
	};
	
	$scope.getPencilCount = function () {
		return Math.round($scope.game.pencil.count *100)/100;	
	};
	
	$scope.getPencilRate = function (){
		return Math.round($scope.game.pencil.rate *1000)/100;	
	};	
	
	$scope.getPencilCost = function (){		
		return Math.round($scope.game.pencil.cost);	
	};
	
	$scope.pencilColorConditions = function() {
		return $scope.getPennyCount()>= $scope.getPencilCost() ? "btn-primary" : "btn-default" 		
	};
	
	$scope.getPencilUnlocked = function (){
		return $scope.game.pencil.unlocked;
	};

	
	/* ******************************************
	******** *Book		************************
	*********************************************/			

	$scope.increaseBookCount = function() {	
	if($scope.game.penny.count>=$scope.game.book.cost){					
		$scope.game.penny.count = $scope.game.penny.count - $scope.game.book.cost;
		$scope.game.book.count = $scope.game.book.count + 1;
		$scope.game.book.cost = Math.round($scope.game.book.cost + ($scope.globalCostGrowthRate * $scope.game.book.cost));
		if(!$scope.game.classes.tabUnlocked){
			$scope.game.classes.tabUnlocked = true;
			$scope.addEntryToConsole("Side Jobs and Class Tabs Unlocked");				 
		 }	
	}else{			
			$scope.addEntryToConsole("Not enough penny to buy book");		
		 }			
	};
	
 	$scope.getBookCount = function (){
		return Math.round($scope.game.book.count *100)/100;	
	};
	
	$scope.getBookRate = function (){
		return Math.round($scope.game.book.rate *1000)/100;	
	};
	
	$scope.getBookCost = function () {
		return Math.round($scope.game.book.cost);
	}	

	$scope.bookColorConditions = function() {
		return $scope.getPennyCount()>= $scope.getBookCost() ? "btn-primary" : "btn-default" 		
	};
	
	$scope.getBookUnlocked = function () {
		return $scope.game.book.unlocked;
	};




	/* ******************************************
	******** *Knowledge		************************
	*********************************************/	

	
	$scope.getKnowledgeCount = function(){
		return  Math.round($scope.game.knowledge.count *100)/100;	
	};
	
	$scope.getKnowledgeRate = function(){		
		return  Math.round($scope.game.knowledge.rate *1000)/100;	
	};
	
	 $scope.getKnowledgeUnlocked = function(){
		return  $scope.game.knowledge.unlocked; 
	 };

	
	/* ******************************************
	******** *Classes ************************
	*********************************************/	
	$scope.getClassTabUnlocked = function (){
		return $scope.game.classes.tabUnlocked;
	};
	
	/* ******************************************
	******** *English 101************************
	*********************************************/	
	
	$scope.classEng101 = function() { 	
		if($scope.game.book.count>=$scope.game.classes.eng101.cost){
			$scope.game.book.count = $scope.game.book.count - $scope.game.classes.eng101.cost;
			$scope.game.knowledge.rate = $scope.game.knowledge.rate + 0.006;
			$scope.game.classes.eng101.count +=  1;
			$scope.game.knowledge.unlocked = true;
			$scope.game.classes.eng101.cost = Math.round($scope.game.classes.eng101.cost + ($scope.globalCostGrowthRate * $scope.game.classes.eng101.cost));
				if($scope.game.jobs.tabUnlocked == false){
					$scope.game.jobs.tabUnlocked = true;
					$scope.addEntryToConsole("Employment Tab Unlocked");	
				}			
		}else {
			$scope.addEntryToConsole("Not enough book to take ENG 101");				
			}
	};
	
	$scope.classEng101Study = function(){		
		if($scope.game.classes.eng101.count>0){
			if($scope.game.pencil.count>=$scope.game.classes.eng101.studyCost){			 
				$scope.game.pencil.count = $scope.game.pencil.count -$scope.game.classes.eng101.studyCost;
				$scope.game.knowledge.count = $scope.game.knowledge.count +1;
				$scope.game.classes.eng101.studyCost = Math.round($scope.game.classes.eng101.studyCost + ($scope.globalCostGrowthRate * $scope.game.classes.eng101.studyCost));
			} else{
				$scope.addEntryToConsole("Not enough pencil to study");
			}
		}else{			
			$scope.addEntryToConsole("You need to take Eng101 first");
		}
	};	

	$scope.classEng101Final = function(){
		if($scope.game.classes.eng101.count>0){
			if($scope.game.pencil.count>=$scope.game.classes.eng101.finalCost){			 
				$scope.game.pencil.count = $scope.game.pencil.count -$scope.game.classes.eng101.finalCost;
				$scope.game.knowledge.count = $scope.game.knowledge.count +10;
				$scope.game.classes.cs142.unlocked = true;
				$scope.game.classes.eng101.finalCost = Math.round($scope.game.classes.eng101.finalCost + ($scope.globalCostGrowthRate * $scope.game.classes.eng101.finalCost));
			} else{
				$scope.addEntryToConsole("Not enough pencil to take final");
			}
		} else {			
			$scope.addEntryToConsole("You need to take Eng101 first");
		}
	};
	
	$scope.getEng101Count = function(){
		return $scope.game.classes.eng101.count;
	};
	
	
	$scope.getEng101Cost = function (){
		return Math.round($scope.game.classes.eng101.cost );
	}
		
	$scope.getEng101StudyCost = function (){
		return Math.round($scope.game.classes.eng101.studyCost );
	}	
	
	$scope.getEng101FinalCost = function (){
		return Math.round($scope.game.classes.eng101.finalCost );
	}

	$scope.eng101ColorConditions = function(){
			return $scope.getBookCount()>= $scope.getEng101Cost() ? "btn-success": "btn-default"
		};	
	
	$scope.eng101StudyColorConditions = function(){
		if($scope.game.classes.eng101.count>0 && $scope.game.pencil.count>= $scope.game.classes.eng101.studyCost ){
			return "btn-success";
		}else{
			return "btn-default";
		}
	};
	
	$scope.eng101FinalColorConditions = function(){
		if($scope.game.classes.eng101.count>0 && $scope.game.pencil.count>= $scope.game.classes.eng101.finalCost ){
			return "btn-success";
		}else{
			return "btn-default";
		}
	};	

	
	/* ******************************************
	******** *CS 142************************
	*********************************************/		
	
	$scope.cs142Tooltip = "The second most failed class in college. Cost: 10 Books";
	$scope.cs142StudyTooltip ="Or trade it to your friend for magic cards. Cost: 5 pencil. Reward: 10 Knowledge";
	$scope.cs142FinalTooltip = "Me.hasStudied? A+, F. I think that's right? Cost: 15 Pencil. Reward: 30 Knowledge";
	
	$scope.classCS142 = function() { 
		if($scope.game.book.count>= $scope.game.classes.cs142.cost){
			$scope.game.book.count = $scope.game.book.count - $scope.game.classes.cs142.cost;
			$scope.game.knowledge.rate = $scope.game.knowledge.rate + 0.012;
			$scope.game.classes.cs142.count +=  1;	
			$scope.game.classes.cs142.cost = Math.round($scope.game.classes.cs142.cost + ($scope.globalCostGrowthRate * $scope.game.classes.cs142.cost));			
		}else {
			$scope.addEntryToConsole("Not enough book to take CS 142");				
			}
	};
	
	$scope.classCS142Study = function(){
		if($scope.game.classes.cs142.count>0){
			if($scope.game.pencil.count>= $scope.game.classes.cs142.studyCost){			 
				$scope.game.pencil.count = $scope.game.pencil.count -$scope.game.classes.cs142.studyCost;
				$scope.game.knowledge.count = $scope.game.knowledge.count +10;
				$scope.game.classes.cs142.studyCost = Math.round($scope.game.classes.cs142.studyCost + ($scope.globalCostGrowthRate * $scope.game.classes.cs142.studyCost));	
			} else{
				$scope.addEntryToConsole("Not enough pencil to do lab");
			}
		}else{			
			$scope.addEntryToConsole("You need to take CS142 first");
		}
	};
	
	$scope.cs142CanStudy = function(){
		if($scope.game.classes.cs142.count>0 && $scope.game.pencil.count>= $scope.game.classes.cs142.studyCost ){
			return true;
		}else{
			return false;
		}
	};	
	$scope.classCS142Final = function(){
		if($scope.game.classes.cs142.count>0){
			if($scope.game.pencil.count>=$scope.game.classes.cs142.finalCost){			 
				$scope.game.pencil.count = $scope.game.pencil.count - $scope.game.classes.cs142.finalCost;
				$scope.game.knowledge.count = $scope.game.knowledge.count +30;
				$scope.game.classes.cs142.finalCost = Math.round($scope.game.classes.cs142.finalCost + ($scope.globalCostGrowthRate * $scope.game.classes.cs142.finalCost));	
				$scope.game.jobs.myspace.unlocked = true;
			} else{
				$scope.addEntryToConsole("Not enough pencil to take final");
			}
		} else {			
			$scope.addEntryToConsole("You need to take CS142 first");
		}
	};
	
	$scope.cs142CanFinal = function(){
		if($scope.game.classes.cs142.count>0 && $scope.game.pencil.count>= $scope.game.classes.cs142.finalCost){
			return true;
		} else {
		return false;
		}
	};
	
	$scope.getCS142Count = function(){
		return  Math.round($scope.game.classes.cs142.count *100)/100;	
	};
	
	$scope.getCS142Cost = function () {
		return Math.round($scope.game.classes.cs142.cost);
	};
	
	$scope.getCS142StudyCost = function () {
		return Math.round($scope.game.classes.cs142.studyCost);
	};
	
	$scope.getCS142FinalCost = function () {
		return Math.round($scope.game.classes.cs142.finalCost);
	};
	
	$scope.getCS142Unlocked = function (){
		return $scope.game.classes.cs142.unlocked;
	};
	
	$scope.cs142ColorConditions = function(){
		return $scope.getBookCount()>= $scope.getCS142Cost() ? "btn-success": "btn-default"
	};	
	
	$scope.cs142StudyColorConditions = function(){
		if($scope.game.classes.cs142.count>0 && $scope.game.pencil.count>= $scope.game.classes.cs142.studyCost ){
			return "btn-success";
		}else{
			return "btn-default";
		}
	};
	
	$scope.cs142FinalColorConditions = function(){
		if($scope.game.classes.cs142.count>0 && $scope.game.pencil.count>= $scope.game.classes.cs142.finalCost ){
			return "btn-success";
		}else{
			return "btn-default";
		}
	};
	
	/* ******************************************
	******** *Jobs   ************************
	*********************************************/	
	
	$scope.resetCurrentJob = function()
	{	
		//mcdonalds
		$scope.game.jobs.mcdonalds.workingAsBurgerFlipper = false;
		$scope.game.jobs.mcdonalds.workingAsCashier = false;
		$scope.game.jobs.mcdonalds.workingAsShiftManager = false;
		$scope.game.jobs.mcdonalds.workingAsManager = false;
		//myspace
		$scope.game.jobs.myspace.workingAsIntern = false;	
		$scope.game.jobs.myspace.workingAsITSupport = false;
		$scope.game.jobs.myspace.workingAsSeniorDev = false;
		$scope.game.jobs.myspace.workingAsCEO = false;
			
	};	
	
	
	$scope.getJobsTabUnlocked = function (){
		return $scope.game.jobs.tabUnlocked;
	};

	/* ******************************************
	******** *McDonalds  ********************
	*********************************************/	

	$scope.applyMcdonalds = function (){	
		if (!$scope.game.jobs.mcdonalds.hired){
			if($scope.game.knowledge.count>=3){
				$scope.game.jobs.mcdonalds.hired = true;
					$scope.game.jobs.mcdonalds.jobListUnlocked =true;
				$scope.game.knowledge.count = $scope.game.knowledge.count - 3;
				
			} else {
					$scope.addEntryToConsole("Not enough knowledge to work there");			 
				}
		} else {
			$scope.addEntryToConsole("You don't need to apply again");		
		}
	};
	
		$scope.mcdonaldsColorConditions = function(){
			if ($scope.game.jobs.mcdonalds.hired ) {
				return "btn-primary";
			}else if($scope.game.knowledge.count>=3){
				return "btn-success";
			}else{
				return "btn-default";
			}
			
	};
	  
	  $scope.getMcdonaldsHired = function () {
		  if($scope.game.jobs.mcdonalds.hired)
		  {
			 return "Hired"; 
		  } else {
			  return null;
		  }
	  };
	  
	  $scope.mcdonaldsBurgerFlipper= function(){		 
		$scope.resetCurrentJob();
		$scope.game.jobs.mcdonalds.workingAsBurgerFlipper = true;
		 
		$scope.game.jobs.pennyRate = 0.006;		  
	  };
	  
	  
	  $scope.mcdonaldsCashier= function(){
		  if($scope.game.jobs.mcdonalds.progress>=33){
				$scope.resetCurrentJob();
				$scope.game.jobs.mcdonalds.workingAsCashier = true;
				
				$scope.game.jobs.pennyRate = 0.012;
		  }	else {
			  $scope.addEntryToConsole("You need more xp to do that job");	
		  }	
	  };	  
	  	
	  $scope.mcdonaldsShiftManager= function(){
		  if($scope.game.jobs.mcdonalds.progress>=67){
				$scope.resetCurrentJob();
				$scope.game.jobs.mcdonalds.workingAsShiftManager = true;
				
				$scope.game.jobs.pennyRate = 0.024;
		  }	else {
			  $scope.addEntryToConsole("You need more xp to do that job");	
		  }	
	  };	  
	  	  	

  
		$scope.mcdonaldsManager= function(){
		  if($scope.game.jobs.mcdonalds.progress>=100){
				$scope.resetCurrentJob();
				$scope.game.jobs.mcdonalds.workingAsManager = true;
				
				$scope.game.jobs.pennyRate = 0.050;
		  }	else {
			  $scope.addEntryToConsole("You need more xp to do that job");	
		  }	
	  };
	  
	$scope.mcdonaldsBurgerFlipperColorCondition= function(){
	  
	  if($scope.game.jobs.mcdonalds.workingAsBurgerFlipper)
	  {
		  return "btn-success";
	  } else {
		  return "btn-primary";  
	  }
	
  };	
		
  $scope.mcdonaldsCashierColorCondition= function(){	 
	  if($scope.game.jobs.mcdonalds.workingAsCashier)
	  {
		  return "btn-success";
	  } else if ($scope.game.jobs.mcdonalds.progress>=33){
		    return "btn-primary"
	  } else {
		  return "btn-default";  
	  }
	
  };
	  
	$scope.mcdonaldsShiftManagerColorCondition= function(){	 
	  if($scope.game.jobs.mcdonalds.workingAsShiftManager)
	  {
		  return "btn-success";
	  } else if ($scope.game.jobs.mcdonalds.progress>=67){
		    return "btn-primary"
	  } else {
		  return "btn-default";  
	  }
	
  };
  	  	
	$scope.mcdonaldsManagerColorCondition= function(){	 
	  if($scope.game.jobs.mcdonalds.workingAsManager)
	  {
		  return "btn-success";
	  } else if ($scope.game.jobs.mcdonalds.progress>=100){
		    return "btn-primary"
	  } else {
		  return "btn-default";  
	  }
	
	};
  
	  $scope.getMcdonaldsProgressRound = function (){
		  return Math.round($scope.game.jobs.mcdonalds.progress * 10)/10;
	  };
	  
	  $scope.getMcdonaldsJobListUnlocked = function (){
		return $scope.game.jobs.mcdonalds.jobListUnlocked;
	}
	
	$scope.getMcdonaldsShiftManagerUnlocked = function (){
		return $scope.game.jobs.mcdonalds.ShiftManagerUnlocked;
	};
	
	$scope.getMcdonaldsManagerUnlocked = function (){
		return $scope.game.jobs.mcdonalds.ManagerUnlocked;
	};
	
	
	
		/* ******************************************
	******** *MySpace  ********************
	*********************************************/	

	
	$scope.applyMyspace = function (){	
		if (!$scope.game.jobs.myspace.hired){
			if($scope.game.knowledge.count>=30){
				$scope.game.jobs.myspace.hired = true;
				$scope.game.jobs.myspace.jobListUnlocked =true;
				$scope.game.knowledge.count -= 30;
				
			} else {
					$scope.addEntryToConsole("Not enough knowledge to work there");			 
				}
		} else {
			$scope.addEntryToConsole("You don't need to apply again");		
		}
	};
	
		$scope.myspaceColorConditions = function(){
			if ($scope.game.jobs.myspace.hired ) {
				return "btn-primary";
			}else if($scope.game.knowledge.count>=30){
				return "btn-success";
			}else{
				return "btn-default";
			}
			
	};
	  
	  $scope.getMyspaceHired = function () {
		  if($scope.game.jobs.myspace.hired)
		  {
			 return "Hired"; 
		  } else {
			  return null;
		  }
	  };
	  
	  
	$scope.myspaceIntern= function(){		 
		$scope.resetCurrentJob();
		$scope.game.jobs.myspace.workingAsIntern = true;		 
		$scope.game.jobs.pennyRate = 0.001;		  
	  };
	  
	$scope.myspaceInternColorCondition= function(){	  
	  if($scope.game.jobs.myspace.workingAsIntern)
	  {
		  return "btn-success";
	  } else {
		  return "btn-primary";  
	  }
	
  };	
	  
	  
	  $scope.myspaceITSupport= function(){
		  if($scope.game.jobs.myspace.progress>=33){
				$scope.resetCurrentJob();
				$scope.game.jobs.myspace.workingAsITSupport = true;				
				$scope.game.jobs.pennyRate = 0.050;
		  }	else {
			  $scope.addEntryToConsole("You need more xp to do that job");	
		  }	
	  };


	$scope.myspaceITSupportColorCondition= function(){	 
	  if($scope.game.jobs.myspace.workingAsITSupport)
	  {
		  return "btn-success";
	  } else if ($scope.game.jobs.myspace.progress>=33){
		    return "btn-primary"
	  } else {
		  return "btn-default";  
	  }
	
  };	  
	  	
	  $scope.myspaceSeniorDev= function(){
		  if($scope.game.jobs.myspace.progress>=67){
				$scope.resetCurrentJob();
				$scope.game.jobs.myspace.workingAsSeniorDev = true;				
				$scope.game.jobs.pennyRate = 0.075;
		  }	else {
			  $scope.addEntryToConsole("You need more xp to do that job");	
		  }	
	  };	 

  $scope.myspaceSeniorDevColorCondition= function(){	 
	  if($scope.game.jobs.myspace.workingAsSeniorDev)
	  {
		  return "btn-success";
	  } else if ($scope.game.jobs.myspace.progress>=67){
		    return "btn-primary"
	  } else {
		  return "btn-default";  
	  }
	
  };	  
	  	  	

  
  $scope.myspaceCEO= function(){
		  if($scope.game.jobs.myspace.progress>=100){
				$scope.resetCurrentJob();
				$scope.game.jobs.myspace.workingAsCEO= true;				
				$scope.game.jobs.pennyRate = 0.100;
		  }	else {
			  $scope.addEntryToConsole("You need more xp to do that job");	
		  }	
	  };  
	
  $scope.myspaceCEOColorCondition= function(){	 
	  if($scope.game.jobs.myspace.workingAsCEO)
	  {
		  return "btn-success";
	  } else if ($scope.game.jobs.myspace.progress>=100){
		    return "btn-primary"
	  } else {
		  return "btn-default";  
	  }
	
  };
		

  
	  $scope.getMyspaceProgressRound = function (){
		  return Math.round($scope.game.jobs.myspace.progress * 10)/10;
	  };
	  
	
	
	$scope.getMyspaceUnlocked = function (){
		return $scope.game.jobs.myspace.unlocked;
	};
		
	$scope.getMyspaceJobListUnlocked = function (){
		return $scope.game.jobs.myspace.jobListUnlocked;
	};
	
	
	$scope.getMyspaceSeniorDevUnlocked  = function(){
		return $scope.game.jobs.myspace.seniorDevUnlocked;
	};	
	
	$scope.getMyspaceCEOUnlocked = function (){
		return $scope.game.jobs.myspace.ceoUnlocked;
	};
	
	
/* ******************************************
	******** *Side Jobs********************
	*********************************************/
	
	
	/* ******************************************
	******** Summer Sales *********************
	*********************************************/
	
	
	$scope.sideJobSummerSales = function (){		
		if($scope.game.player.energy>=35){
			$scope.game.player.energy -= 35;
			$scope.game.penny.count+= (50+ ($scope.game.pencil.count * 5));
		}else{
			 $scope.addEntryToConsole("You don't have enough energy to do that job");	
		}		
	};
	
	$scope.getSideJobSummerSalesTooltip = function (){
		return "The more pencils you have the better salesman you are. Reward: " + (50+ ($scope.game.pencil.count * 5)) + " penny";
	};
	
	$scope.sideJobSummerSalesColorCondition = function (){
		  if($scope.game.player.energy>=35)
	  {
		  return "btn-primary";	  
	  } else {
		  return "btn-default";  
	  }	
	};
		
		$scope.getSideJobSummerSalesCost = function (){
			return "35";
		};
	
		
	/* ******************************************
	******** Tutor *********************
	*********************************************/
	
	
	$scope.sideJobTutor = function (){
		if($scope.game.player.energy>=25){
			$scope.game.player.energy -= 25;
			$scope.game.penny.count+= (25+ ($scope.game.book.count *5));
		}else{
			 $scope.addEntryToConsole("You don't have enough energy to do that job");	
		}		
	};	
	
	$scope.getSideJobTutorTooltip = function (){
		return "The more books you have the better tutor you are. Reward: " + (25+ ($scope.game.book.count *5)) + " penny";
	};
	
	$scope.sideJobTutorColorCondition = function (){		
	  if($scope.game.player.energy>=25)
	  {
		  return "btn-primary";	  
	  } else {
		  return "btn-default";  
	  }	
	};
		
		$scope.getSideJobTutorCost = function (){
			return "25";
		};

		

	/* ******************************************
	******** *Dynamic content filler ********************
	*********************************************/	


	/* ******************************************
	******** *Self Currency List ********************
	*********************************************/

	
	$scope.selfCurrencyList = [	
		{
			title: "Penny",
			count: $scope.getPennyCount,
			showCount: true,
			rate: $scope.getPennyRate,
			showRate: true,
			unlocked: true,
		},
		{
			title: "Pencil",
			count: $scope.getPencilCount,
			showCount: true,
			rate: null,
			showRate: false,
			unlocked: $scope.getPencilUnlocked,
		},
		{
			title: "Book",
			count: $scope.getBookCount,
			showCount: true,
			rate: null,
			showRate: false,
			unlocked: $scope.getBookUnlocked,
		},
		{
			title: "Knowledge",
			count: $scope.getKnowledgeCount,
			showCount: true,
			rate: $scope.getKnowledgeRate,
			showRate: true,
			unlocked: $scope.getKnowledgeUnlocked,
		}
	
	];
	
	
			/* ******************************************
	******** *Side Jobs List********************
	*********************************************/
	


	
	$scope.sideJobsList = [
		{
			buttonText:"Summer Sales ",
			toolTip:$scope.getSideJobSummerSalesTooltip,
			clickCondition:$scope.sideJobSummerSales,
			colorCondition: $scope.sideJobSummerSalesColorCondition,
			getCostFunction: $scope.getSideJobSummerSalesCost, 
			getCostCurrency: " energy",
			
		},
		{
			buttonText:"Tutor a classmate ",
			toolTip:$scope.getSideJobTutorTooltip,
			clickCondition:$scope.sideJobTutor,
			colorCondition: $scope.sideJobTutorColorCondition,
			getCostFunction: $scope.getSideJobTutorCost, 
			getCostCurrency: " energy",
			
		},
		
	];
	
	

	
	
		/* ******************************************
	******** *Self Button List ********************
	*********************************************/
	$scope.selfButtonList = [
		//Penny
		{buttonText:'Go find one Penny',
		getCostFunction: null, 
		getCostCurrency: null,
		toolTip: "Oh look a penny!", 
		colorCondition: $scope.pennyColorConditions,
		clickCondition: $scope.increasePennyCount,
		unlocked: true,
		},			
		//Pencil
		{buttonText:'Buy pencil',
		getCostFunction: $scope.getPencilCost, 
		getCostCurrency: " penny",
		toolTip: "Always good to take notes in college", 
		colorCondition: $scope.pencilColorConditions,
		clickCondition: $scope.increasePencilCount,
		unlocked: $scope.getPencilUnlocked,
		},
		//Book
		{buttonText:'Buy book',
		getCostFunction: $scope.getBookCost, 
		getCostCurrency: " penny",
		toolTip: "Textbooks are always overpriced and I couldn't find a pdf online", 
		colorCondition: $scope.bookColorConditions,
		clickCondition: $scope.increaseBookCount,
		unlocked: $scope.getBookUnlocked,
		}				
	];
		
	/* ******************************************
	******** *Class List ********************
	*********************************************/		

	$scope.classButtonList =[
	
		//DADA
		/*{	className: "Defence Against the Dark Arts",
			unlocked: $scope.getDadaUnlocked,
			classCount: $scope.getDadaCount,
			body:[ 
				{	buttonText:"Take DaDa",
					toolTip: "This can't possibly be a legit college course.  Reward: 0.24 knowledge/sec", 
					getCostFunction: $scope.getDadaCost, 
					getCostCurrency: " book",
					clickCondition: $scope.classDada,					
					colorCondition: $scope.dadaColorConditions,
				},
				{	buttonText:"Curse Neville",
					toolTip: "For a defence class, I'm sure learning alot of evil courses. Reward: 20 Knowledge", 
					getCostFunction: $scope.getDadaStudyCost, 
					getCostCurrency: " pencil",
					clickCondition: $scope.classDadaStudy,					
					colorCondition: $scope.dadaStudyColorConditions,
				},
				{	buttonText:"Duel Voldemort",
					toolTip: "Expecto Patronum. Reward 50 knowledge", 
					getCostFunction: $scope.getDadaFinalCost, 
					getCostCurrency: " pencil",
					clickCondition: $scope.classDadaFinal,					
					colorCondition: $scope.dadaFinalColorConditions,
				}
			]				
		},*/
			//CS142
		{	className: "CS 142",
			unlocked: $scope.getCS142Unlocked,
			classCount: $scope.getCS142Count,
			body:[ 
				{	buttonText:"Take CS 142",
					toolTip: "The second most failed class in college. Reward: 0.12 knowledge/sec", 
					getCostFunction: $scope.getCS142Cost, 
					getCostCurrency: " book",
					clickCondition: $scope.classCS142,					
					colorCondition: $scope.cs142ColorConditions,
				},
				{	buttonText:"Do Bubble Sort Lab",
					toolTip: "Or trade it to your friend for magic cards. Reward: 10 Knowledge", 
					getCostFunction: $scope.getCS142StudyCost, 
					getCostCurrency: " pencil",
					clickCondition: $scope.classCS142Study,					
					colorCondition: $scope.cs142StudyColorConditions,
				},
				{	buttonText:'Take the Final"',
					toolTip: "I love magic numbers. Reward 30 knowledge", 
					getCostFunction: $scope.getCS142FinalCost, 
					getCostCurrency: " pencil",
					clickCondition: $scope.classCS142Final,					
					colorCondition: $scope.cs142FinalColorConditions,
				}
			]				
		},	
		//English 101
		{	className: "English 101",
			unlocked: true,
			classCount: $scope.getEng101Count,
			body:[ 
				{	buttonText:"Take ENG 101",
					toolTip: "The first class of any respectable college student. Reward: 0.06 knowledge/sec", 
					getCostFunction: $scope.getEng101Cost, 
					getCostCurrency: " book",
					clickCondition: $scope.classEng101,					
					colorCondition: $scope.eng101ColorConditions,
				},
				{	buttonText:'Study "English"',
					toolTip: "As if I didn't already know enligsh. Reward: 1 Knowledge", 
					getCostFunction: $scope.getEng101StudyCost, 
					getCostCurrency: " pencil",
					clickCondition: $scope.classEng101Study,					
					colorCondition: $scope.eng101StudyColorConditions,
				},
				{	buttonText:"Take the Final",
					toolTip: "Do or do not, there is no try. Reward: 10 knowledge", 
					getCostFunction: $scope.getEng101FinalCost, 
					getCostCurrency: " pencil",
					clickCondition: $scope.classEng101Final,					
					colorCondition: $scope.eng101FinalColorConditions,
				}
			]				
		},
	
	];		

	
		/* ******************************************
	******** *Jobs List ********************
	*********************************************/	
		$scope.jobButtonList =[	
		// ministry of magic
		/*{
			buttonText:"Apply at Ministry of Magic",
			unlocked: $scope.getMinistryUnlocked,
			hired: $scope.getMinistryHired,
			jobListUnlocked:$scope.getMinistryJobListUnlocked,
			toolTip:" Cost to apply: 50 knowledge",			
			clickCondition: $scope.applyMinistry,
			colorCondition: $scope.ministryColorConditions,			
			progress: $scope.getMinistryProgressRound,
			body:[
				{	jobName:"Misuse of Muggle Artifacts",
					toolTip: "Singing toilet seats are the worst. They like to spray water on you",
					colorCondition:$scope.ministryMisuseMuggleColorCondition,
					unlocked:true,
					clickCondition: $scope.ministryMisuseMuggle,
					reward: "0.75 p/s",
				},
				{	jobName:"DaDa Teacher",
					toolTip: "This will probably only last one year",
					colorCondition:$scope.ministryDadaTeacherColorCondition,
					unlocked:true,
					clickCondition: $scope.ministryDadaTeacher,
					reward: "1.0 p/s",
				},
				{	jobName:"Auror",
					toolTip: "Totally gonna no scope some death eaters",
					colorCondition:$scope.ministryAurorColorCondition,
					unlocked:$scope.getMinistryAurorUnlocked,
					clickCondition: $scope.ministryAuror,
					reward: "1.75 p/s",
				},
				{	jobName:"Minister of Magic",
					toolTip: "Wait, when did I become British",
					colorCondition:$scope.ministryMinisterColorCondition,
					unlocked:$scope.getMinistryMinisterUnlocked,
					clickCondition: $scope.ministryMinister,
					reward: "3.0 p/s",
				}
			],
		},	*/		
				
		// Myspace peon
		{
			buttonText:"Apply at MySpace",
			unlocked: $scope.getMyspaceUnlocked,
			hired: $scope.getMyspaceHired,
			jobListUnlocked:$scope.getMyspaceJobListUnlocked,
			toolTip:"I still have loads of friends on myspace. Cost to apply: 30 knowledge",			
			clickCondition: $scope.applyMyspace,
			colorCondition: $scope.myspaceColorConditions,			
			progress: $scope.getMyspaceProgressRound,
			body:[
				{	jobName:"Intern to junior Dev ",
					toolTip: "So I'm getting the guy who gets everyone else coffee coffee?",
					colorCondition:$scope.myspaceInternColorCondition,
					unlocked:true,
					clickCondition: $scope.myspaceIntern,
					reward: "0.01 p/s",
				},
				{	jobName:"IT Support ",
					toolTip: "Have you tried turning off and on again. Requires 33% XP",
					colorCondition:$scope.myspaceITSupportColorCondition,
					unlocked:true,
					clickCondition: $scope.myspaceITSupport,
					reward: "0.50 p/s",
				},
				{	jobName:"Senior Developer ",
					toolTip: "I don't know what I should do. We haven't updated the site in years. Requires 67% XP",
					colorCondition:$scope.myspaceSeniorDevColorCondition,
					unlocked:$scope.getMyspaceSeniorDevUnlocked,
					clickCondition: $scope.myspaceSeniorDev,
					reward: "0.75 p/s",
				},
				{	jobName:"CEO ",
					toolTip: "Too bad facebook already replaced you. At least you have Finnish Death Metal bands to keep you company. Requires 100% XP",
					colorCondition:$scope.myspaceCEOColorCondition,
					unlocked:$scope.getMyspaceCEOUnlocked,
					clickCondition: $scope.myspaceCEO,
					reward: "1.0 p/s",
				}
				
			]
		},
		
		//Mcdonalds
		{
			buttonText:"Apply at McDonalds",
			unlocked: true,
			hired: $scope.getMcdonaldsHired,
			jobListUnlocked:$scope.getMcdonaldsJobListUnlocked,
			toolTip:"It doesn't get much worse than here. Cost to apply: 3 knowledge",			
			clickCondition: $scope.applyMcdonalds,
			colorCondition: $scope.mcdonaldsColorConditions,			
			progress: $scope.getMcdonaldsProgressRound,
			body:[
				{	jobName:"Burger Flipper ",
					toolTip: "It could be worse right?",
					colorCondition:$scope.mcdonaldsBurgerFlipperColorCondition,
					unlocked:true,
					clickCondition: $scope.mcdonaldsBurgerFlipper,
					reward: "0.06 p/s",
				},
				{	jobName:"Cashier ",
					toolTip: "If I keep demanding 15/hr they're gonna replace me with a touchscreen. Requires 33% XP",
					colorCondition:$scope.mcdonaldsCashierColorCondition,
					unlocked:true,
					clickCondition: $scope.mcdonaldsCashier,
					reward:"0.12 p/s",
				},
				{	jobName:"Shift Manager ",
					toolTip: "I'm the third most important person in my company. Too bad there are only 3 of us. Requires 67% XP",
					colorCondition:$scope.mcdonaldsShiftManagerColorCondition,
					unlocked:$scope.getMcdonaldsShiftManagerUnlocked,
					clickCondition: $scope.mcdonaldsShiftManager,
					reward:"0.24 p/s",
				},
				{	jobName:"Manager ",
					toolTip: "Bossing around 15 year olds makes me feel important. Requires 100% XP",
					colorCondition:$scope.mcdonaldsManagerColorCondition,
					unlocked:$scope.getMcdonaldsManagerUnlocked,
					clickCondition: $scope.mcdonaldsManager,
					reward:"0.50 p/s",
				}				
			]
		},

		];
		
		
				
		/* ******************************************
	******** *Relationships ********************
	*********************************************/	
	$scope.playerGenderMale = true;
	
		$scope.girlfriendAttributes=[
		{
			name: "Katie",
			hair:"Blonde",
		},
		{
			name:"Mckayla",
			hair:"Brown",
		},
		{
			name:"Jessica",
			hair:"Brown",
		},
	];
	
		
		$scope.boyfriendAttributes=[		
		{
			name:"Wes",
			hair:"Brown",
		},
		{
			name:"Cole",
			hair:"Brown",
		},
		{
			name:"Kaleb",
			hair:"Brown",
		},
	];
	
	$scope.girlfriend1Unlocked = false;	
	$scope.girlfriend1 =$scope.girlfriendAttributes[0]; 
	$scope.girlfriend1Name = $scope.girlfriend1.name;
	
		

		
	/* ******************************************
	******** *Girlfriend 1 ********************
	*********************************************/	
	
	$scope.getGirlfriend1Name = function (){
		if($scope.girlfriend1Unlocked == true){
			return $scope.girlfriend1Name;
		}else{			
			return "Go on the prowl";
		}
	};
	
	$scope.girlfriend1ClickCondition = function () {
		if($scope.girlfriend1Unlocked){
			// add something
		}else if($scope.game.player.energy >=100) {
			$scope.game.player.energy -=100;
			if($scope.playerGenderMale){   //get a girlfriend
				$scope.girlfriend1 =$scope.girlfriendAttributes[(Math.floor((Math.random() * $scope.girlfriendAttributes.length)))]; 
				$scope.girlfriend1Name = $scope.girlfriend1.name;
				$scope.girlfriend1Unlocked = true;
			}
			else {   //get a boyfriend
				$scope.girlfriend1 =$scope.boyfriendAttributes[(Math.floor((Math.random() * $scope.boyfriendAttributes.length)))]; 
				$scope.girlfriend1Name = $scope.girlfriend1.name;
				$scope.girlfriend1Unlocked = true;
			}
		} else{
			 $scope.addEntryToConsole("You don't have enough energy to find a date");	
		}
	};
	
	$scope.getGirlfriend1Tooltip = function (){
		if($scope.girlfriend1Unlocked){
			return "Shes cute";
		} else{
			return "Rejection is hard, so don't be too sad";
		}
		
	};
	
	$scope.girlfriend1ColorCondition = function (){
		if($scope.girlfriend1Unlocked){
		   return "btn-primary";	  
		} 
		else if($scope.game.player.energy>=100)
	  {
		  return "btn-success";	  
	  } else {
		  return "btn-default";  
	  }
	};
	
	$scope.girlfriend1EnergyCost = function (){
			if(!$scope.girlfriend1Unlocked){
			return "Energy: 100";
		} else{
			return null;
		}
	}
	
	$scope.getGirlfriend1Unlocked=function (){
		return $scope.girlfriend1Unlocked;
	}
	
	
		/* ******************************************
	******** *Girlfriend 2  ********************
	*********************************************/	
	
	
	 $scope.girlfriend2Unlocked =false;
	 
		$scope.getGirlfriend2Name = function (){
		if($scope.girlfriend1Unlocked == true){
			return $scope.girlfriend1Name;
		}else{			
			return "Go on the prowl";
		}
	};
	
	
		$scope.getGirlfriend2Unlocked=function (){
		return $scope.girlfriend2Unlocked;
	}
	
		
	$scope.relationshipList = [
		//girlfriend1
		{
			buttonText:$scope.getGirlfriend1Name,
			unlocked:true,
			toolTip: $scope.getGirlfriend1Tooltip,
			clickCondition: $scope.girlfriend1ClickCondition,
			colorCondition:$scope.girlfriend1ColorCondition,
			energyCost: $scope.girlfriend1EnergyCost,
			tabsUnlocked: $scope.getGirlfriend1Unlocked,
				
			
		},
		//girlfriend2
		{
			buttonText:$scope.getGirlfriend2Name,
			unlocked:$scope.getGirlfriend1Unlocked,
			toolTip: null,
			clickCondition: null,
			colorCondition:null,
			energyCost: null,
			tabsUnlocked:  $scope.getGirlfriend2Unlocked,
		},
	];

	

	
	// End of main function
	} 
]);


