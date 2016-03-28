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
*/

angular.module('studentGame', []) 
.controller('coreController', [ 
'$scope','$http', 
function($scope,$http){ 

	/* ******************************************
	******** * Tick Counter	********************
	*********************************************/	

	var tickTimerVar = setInterval(tickTimer, 100);		
	function tickTimer() {	
		$scope.pennyCount =  $scope.pennyCount + $scope.pennyRate;	
		$scope.knowledgeCount = $scope.knowledgeCount + $scope.knowledgeRate;
		}

	/* ******************************************
	******** * Misc Functions ******************	
	*********************************************/	

	// Auto Screen Refresh
	var updateScreenTimerVar = setInterval(updateScreenTimer, 1000);
	function updateScreenTimer() {
	  $scope.$apply(function () {
		   // Updates the screen every second without any user clicking
			});
		}

	//TimeStamp
	// Gets time for console timestamps output
	$scope.getDatetime = function() {
		var today = new Date();	
		return today.getHours() +":"+ ((today.getMinutes() < 10)?"0":"") +today.getMinutes() + ":"+ ((today.getSeconds() < 10)?"0":"") + today.getSeconds();	
		};

	// Write to user console
	//Easy function to call to add text to user console
	$scope.gameOutputConsoleEntryCount = 0;
	
	$scope.addEntryToConsole = function(contentText){
		$scope.gameOutputConsoleEntryCount = $scope.gameOutputConsoleEntryCount +1;
		$scope.gameOutputConsoleList.push({content:contentText, number:$scope.gameOutputConsoleEntryCount,timestamp:$scope.getDatetime()}); 	
		};
		//Default user console value
		$scope.gameOutputConsoleList = [
			{content:'You are a poor student wandering through college', number:0, timestamp:$scope.getDatetime()}, 		
		];
	
	// TODO : Get Player name from database
	$http.get("/users/me", {withCredentials: true})
	.then(
		function success(data) {
			console.log(data);
			user = data.data;
			$scope.playerName = user.username;
			$scope.playerBodyLevel = user.body_type;
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

	// TODO : Get Body Level name from database
	// $scope.playerBodyLevel = "Far Below Average";	
	
	$scope.getPlayerBodyLevel = function(){
		return $scope.playerBodyLevel;
	};
	
	/* ******************************************
	******** * Base Currencies	*****************
	*********************************************/	
	
	
	/* ******************************************
	******** *Penny		************************
	*********************************************/	
	$scope.pennyCount = 1000;
	$scope.pennyTooltip = "You use penny to buy things";
	$scope.pennyRate = 0;
	$scope.pennyUnlocked = true;

	$scope.increasePennyCount = function() {
		$scope.pennyCount = $scope.pennyCount + 1;
		if($scope.pennyCount>=10){
			$scope.pencilUnlocked = true;				
		}			
	};
	
	$scope.getPennyRate = function(){
		return  Math.round($scope.pennyRate *1000)/100;	
	};
	
	$scope.getPennyCount = function(){		
		return Math.round($scope.pennyCount *100)/100;	
	};

	
	/* ******************************************
	******** *Pencil   ************************
	*********************************************/	
	$scope.pencilCount = 0;
	$scope.pencilTooltip ="It's often good to write stuff down. Cost :10 penny";
	$scope.pencilRate = 0;
	$scope.pencilUnlocked = false;
	
	$scope.increasePencilCount = function() {
		if($scope.pennyCount>=10){					
			$scope.pennyCount = $scope.pennyCount -10;
			$scope.pencilCount = $scope.pencilCount + 1;
			$scope.bookUnlocked =true;
		}
		else{		
			$scope.addEntryToConsole("Not enough penny to buy pencil");				 
		}			
	};
	
	$scope.getPencilCount = function () {
		return Math.round($scope.pencilCount *100)/100;	
	};
	
	$scope.getPencilRate = function (){
		return Math.round($scope.pencilRate *1000)/100;	
	};	
	
	/* ******************************************
	******** *Book		************************
	*********************************************/			
	$scope.bookCount= 0;	
	$scope.bookTooltip = "Overpriced and can't find a pdf online. Cost: 20 penny";
	$scope.bookRate = 0;
	$scope.bookUnlocked = false;
	
	$scope.increaseBookCount = function() {
	if($scope.pennyCount>=20){					
		$scope.pennyCount = $scope.pennyCount - 20;
		$scope.bookCount = $scope.bookCount + 1;
		if(!$scope.classTabUnlocked){
			$scope.classTabUnlocked = true;
			$scope.addEntryToConsole("Class Tab Unlocked");				 
		 }	
	}else{			
			$scope.addEntryToConsole("Not enough penny to buy book");		
		 }			
	};
	
 	$scope.getBookCount = function (){
		return Math.round($scope.bookCount *100)/100;	
	};
	
	$scope.getBookRate = function (){
		return Math.round($scope.bookRate *1000)/100;	
	};
	
	/* ******************************************
	******** *Knowledge		************************
	*********************************************/	
	
	$scope.knowledgeCount = 0;
	$scope.knowledgeRate = 0;
	$scope.knowledgeUnlocked = false;
	
	$scope.getKnowledgeCount = function(){
		return  Math.round($scope.knowledgeCount *100)/100;	
	};
	
	$scope.getKnowledgeRate = function(){		
		return  Math.round($scope.knowledgeRate *1000)/100;	
	};
	
	
	/* ******************************************
	******** *Classes ************************
	*********************************************/	
	$scope.classTabUnlocked = false;
	
	/* ******************************************
	******** *English 101************************
	*********************************************/	
	$scope.eng101Count = 0;
	$scope.eng101Tooltip = "The first class of any respectable college student. Cost: 3 book";
	$scope.eng101StudyTooltip = "As if I didn't already know enligsh.\nCost: 2 Pencil.\nReward: 1 knowledge";
	$scope.eng101FinalTooltip = "Do or do not, there is no try. Wait, thats not Shakespeare. Cost: 10 Pencil. Reward: 10 Knowledge";
	$scope.eng101Unlocked = true;
	
	$scope.classEng101 = function() { 
		if($scope.bookCount>=3){
			$scope.bookCount = $scope.bookCount - 3;
			$scope.knowledgeRate = $scope.knowledgeRate + 0.006;
			$scope.eng101Count = $scope.eng101Count + 1;
			$scope.knowledgeUnlocked = true;
				if($scope.jobsTabUnlocked == false){
					$scope.jobsTabUnlocked = true;
					$scope.addEntryToConsole("Jobs Tab Unlocked");	
				}			
		}else {
			$scope.addEntryToConsole("Not enough book to take ENG 101");				
			}
	};
	
	$scope.classEng101Study = function(){
		if($scope.eng101Count>0){
			if($scope.pencilCount>=2){			 
				$scope.pencilCount = $scope.pencilCount -2;
				$scope.knowledgeCount = $scope.knowledgeCount +1;
			} else{
				$scope.addEntryToConsole("Not enough pencil to study");
			}
		}else{			
			$scope.addEntryToConsole("You need to take Eng101 first");
		}
	};
	
	$scope.eng101CanStudy = function(){
		if($scope.eng101Count>0 && $scope.pencilCount>=2 ){
			return true;
		}else{
			return false;
		}
	};	
	$scope.classEng101Final = function(){
		if($scope.eng101Count>0){
			if($scope.pencilCount>=10){			 
				$scope.pencilCount = $scope.pencilCount -10;
				$scope.knowledgeCount = $scope.knowledgeCount +10;
				$scope.cs142Unlocked = true;
			} else{
				$scope.addEntryToConsole("Not enough pencil to take final");
			}
		} else {			
			$scope.addEntryToConsole("You need to take Eng101 first");
		}
	};
	
	$scope.eng101CanFinal = function(){
		if($scope.eng101Count>0 && $scope.pencilCount>=10 ){
			return true;
		} else {
		return false;
		}
	};
	
	$scope.getEng101Count = function(){
		return $scope.eng101Count;
	};
	
	/* ******************************************
	******** *CS 142************************
	*********************************************/		
	$scope.cs142Unlocked = false;
	$scope.cs142Count = 0;
	$scope.cs142Tooltip = "The second most failed class in college. Cost: 10 Books";
	$scope.cs142StudyTooltip ="Or trade it to your friend for magic cards. Cost: 5 pencil. Reward: 10 Knowledge";
	$scope.cs142FinalTooltip = "Me.hasStudied? A+, F. I think that's right? Cost: 15 Pencil. Reward: 30 Knowledge";
	
	$scope.classCS142 = function() { 
		if($scope.bookCount>=10){
			$scope.bookCount = $scope.bookCount - 10;
			$scope.knowledgeRate = $scope.knowledgeRate + 0.012;
			$scope.cs142Count = $scope.cs142Count + 1;							
		}else {
			$scope.addEntryToConsole("Not enough book to take CS 142");				
			}
	};
	
	$scope.classCS142Study = function(){
		if($scope.cs142Count>0){
			if($scope.pencilCount>=5){			 
				$scope.pencilCount = $scope.pencilCount -5;
				$scope.knowledgeCount = $scope.knowledgeCount +10;
			} else{
				$scope.addEntryToConsole("Not enough pencil to do lab");
			}
		}else{			
			$scope.addEntryToConsole("You need to take CS142 first");
		}
	};
	
	$scope.cs142CanStudy = function(){
		if($scope.cs142Count>0 && $scope.pencilCount>=5 ){
			return true;
		}else{
			return false;
		}
	};	
	$scope.classCS142Final = function(){
		if($scope.cs142Count>0){
			if($scope.pencilCount>=15){			 
				$scope.pencilCount = $scope.pencilCount -15;
				$scope.knowledgeCount = $scope.knowledgeCount +30;
				//TODO add next class unlock
			} else{
				$scope.addEntryToConsole("Not enough pencil to take final");
			}
		} else {			
			$scope.addEntryToConsole("You need to take CS142 first");
		}
	};
	
	$scope.cs142CanFinal = function(){
		if($scope.cs142Count>0 && $scope.pencilCount>=15 ){
			return true;
		} else {
		return false;
		}
	};
	
	$scope.getCS142Count = function(){
		return  Math.round($scope.cs142Count *100)/100;	
	};
	
	/* ******************************************
	******** *Jobs   ************************
	*********************************************/	
	$scope.jobsTabUnlocked = false;
	
	/* ******************************************
	******** *Burger Flipper  ********************
	*********************************************/	
	
	$scope.jobBurgerFlipperTooltip = "Pretty much the only job someone as dumb as you could get. Cost: 3 knowledge Reward: 1 penny per hour";
	
	$scope.jobBurgerFlipper = function(){		
		if($scope.knowledgeCount>=3){
			$scope.knowledgeCount = $scope.knowledgeCount - 3;
			$scope.pennyRate = 	$scope.pennyRate+ 0.006;	
		} else {
				$scope.addEntryToConsole("Not enough knowledge to work there");			 
			}	
	};
	  


	


	
	// End of main function
	} 
]);

