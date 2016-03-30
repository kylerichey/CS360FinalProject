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

	
	$scope.getPlayerBodyLevel = function(){
		return $scope.playerBodyLevel;
	};
	
	//growth function
	$scope.globalCostGrowthRate = 0.05;
	
	/* ******************************************
	******** * Base Currencies	*****************
	*********************************************/	
	
	
	/* ******************************************
	******** *Penny		************************
	*********************************************/	
	$scope.pennyCount = 1000;
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
	$scope.pencilRate = 0;
	$scope.pencilUnlocked = false;
	$scope.pencilCost = 10;
	
	$scope.increasePencilCount = function() {				
		if($scope.pennyCount>= $scope.pencilCost){					
			$scope.pennyCount = $scope.pennyCount - $scope.pencilCost;
			$scope.pencilCount = $scope.pencilCount + 1;
			$scope.pencilCost = Math.round($scope.pencilCost + ($scope.globalCostGrowthRate * $scope.pencilCost));  //calculate new cost			
			if(!$scope.bookUnlocked){
				$scope.bookUnlocked =true;
			}
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
	
	$scope.getPencilCost = function (){		
		return Math.round($scope.pencilCost);	
	};		

	
	/* ******************************************
	******** *Book		************************
	*********************************************/			
	$scope.bookCount= 0;		
	$scope.bookRate = 0;
	$scope.bookUnlocked = false;
	$scope.bookCost = 20;
	
	$scope.increaseBookCount = function() {	
	if($scope.pennyCount>=$scope.bookCost){					
		$scope.pennyCount = $scope.pennyCount - $scope.bookCost;
		$scope.bookCount = $scope.bookCount + 1;
		$scope.bookCost = Math.round($scope.bookCost + ($scope.globalCostGrowthRate * $scope.bookCost));
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
	
	$scope.getBookCost = function () {
		return Math.round($scope.bookCost);
	}	

	

	
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
	$scope.eng101Unlocked = true;
	$scope.eng101Cost = 3;
	$scope.eng101StudyCost = 2;
	$scope.eng101FinalCost = 10;
	
	$scope.classEng101 = function() { 	
		if($scope.bookCount>=$scope.eng101Cost){
			$scope.bookCount = $scope.bookCount - $scope.eng101Cost;
			$scope.knowledgeRate = $scope.knowledgeRate + 0.006;
			$scope.eng101Count = $scope.eng101Count + 1;
			$scope.knowledgeUnlocked = true;
			$scope.eng101Cost = Math.round($scope.eng101Cost + ($scope.globalCostGrowthRate * $scope.eng101Cost));
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
			if($scope.pencilCount>=$scope.eng101StudyCost){			 
				$scope.pencilCount = $scope.pencilCount -$scope.eng101StudyCost;
				$scope.knowledgeCount = $scope.knowledgeCount +1;
				$scope.eng101StudyCost = Math.round($scope.eng101StudyCost + ($scope.globalCostGrowthRate * $scope.eng101StudyCost));
			} else{
				$scope.addEntryToConsole("Not enough pencil to study");
			}
		}else{			
			$scope.addEntryToConsole("You need to take Eng101 first");
		}
	};
	
	$scope.eng101CanStudy = function(){
		if($scope.eng101Count>0 && $scope.pencilCount>= $scope.eng101StudyCost ){
			return true;
		}else{
			return false;
		}
	};	
	$scope.classEng101Final = function(){
		if($scope.eng101Count>0){
			if($scope.pencilCount>=$scope.eng101FinalCost){			 
				$scope.pencilCount = $scope.pencilCount -$scope.eng101FinalCost;
				$scope.knowledgeCount = $scope.knowledgeCount +10;
				$scope.cs142Unlocked = true;
				$scope.eng101FinalCost = Math.round($scope.eng101FinalCost + ($scope.globalCostGrowthRate * $scope.eng101FinalCost));
			} else{
				$scope.addEntryToConsole("Not enough pencil to take final");
			}
		} else {			
			$scope.addEntryToConsole("You need to take Eng101 first");
		}
	};
	
	$scope.eng101CanFinal = function(){
		if($scope.eng101Count>0 && $scope.pencilCount>=$scope.eng101FinalCost ){
			return true;
		} else {
		return false;
		}
	};
	
	$scope.getEng101Count = function(){
		return $scope.eng101Count;
	};
	
	
	$scope.getEng101Cost = function (){
		return Math.round($scope.eng101Cost );
	}
		
	$scope.getEng101StudyCost = function (){
		return Math.round($scope.eng101StudyCost );
	}	
	
	$scope.getEng101FinalCost = function (){
		return Math.round($scope.eng101FinalCost );
	}	

	
	/* ******************************************
	******** *CS 142************************
	*********************************************/		
	$scope.cs142Unlocked = false;
	$scope.cs142Count = 0;
	$scope.cs142Cost = 10;
	$scope.cs142StudyCost = 5;
	$scope.cs142FinalCost =15;
	
	$scope.cs142Tooltip = "The second most failed class in college. Cost: 10 Books";
	$scope.cs142StudyTooltip ="Or trade it to your friend for magic cards. Cost: 5 pencil. Reward: 10 Knowledge";
	$scope.cs142FinalTooltip = "Me.hasStudied? A+, F. I think that's right? Cost: 15 Pencil. Reward: 30 Knowledge";
	
	$scope.classCS142 = function() { 
		if($scope.bookCount>= $scope.cs142Cost){
			$scope.bookCount = $scope.bookCount - $scope.cs142Cost;
			$scope.knowledgeRate = $scope.knowledgeRate + 0.012;
			$scope.cs142Count = $scope.cs142Count + 1;	
			$scope.cs142Cost = Math.round($scope.cs142Cost + ($scope.globalCostGrowthRate * $scope.cs142Cost));			
		}else {
			$scope.addEntryToConsole("Not enough book to take CS 142");				
			}
	};
	
	$scope.classCS142Study = function(){
		if($scope.cs142Count>0){
			if($scope.pencilCount>= $scope.cs142StudyCost){			 
				$scope.pencilCount = $scope.pencilCount -$scope.cs142StudyCost;
				$scope.knowledgeCount = $scope.knowledgeCount +10;
				$scope.cs142StudyCost = Math.round($scope.cs142StudyCost + ($scope.globalCostGrowthRate * $scope.cs142StudyCost));	
			} else{
				$scope.addEntryToConsole("Not enough pencil to do lab");
			}
		}else{			
			$scope.addEntryToConsole("You need to take CS142 first");
		}
	};
	
	$scope.cs142CanStudy = function(){
		if($scope.cs142Count>0 && $scope.pencilCount>= $scope.cs142StudyCost ){
			return true;
		}else{
			return false;
		}
	};	
	$scope.classCS142Final = function(){
		if($scope.cs142Count>0){
			if($scope.pencilCount>=$scope.cs142FinalCost){			 
				$scope.pencilCount = $scope.pencilCount - $scope.cs142FinalCost;
				$scope.knowledgeCount = $scope.knowledgeCount +30;
				$scope.cs142FinalCost = Math.round($scope.cs142FinalCost + ($scope.globalCostGrowthRate * $scope.cs142FinalCost));	
				//TODO add next class unlock
			} else{
				$scope.addEntryToConsole("Not enough pencil to take final");
			}
		} else {			
			$scope.addEntryToConsole("You need to take CS142 first");
		}
	};
	
	$scope.cs142CanFinal = function(){
		if($scope.cs142Count>0 && $scope.pencilCount>= $scope.cs142FinalCost){
			return true;
		} else {
		return false;
		}
	};
	
	$scope.getCS142Count = function(){
		return  Math.round($scope.cs142Count *100)/100;	
	};
	
	$scope.getCS142Cost = function () {
		return Math.round($scope.cs142Cost);
	};
	
	$scope.getCS142StudyCost = function () {
		return Math.round($scope.cs142StudyCost);
	};
	
	$scope.getCS142FinalCost = function () {
		return Math.round($scope.cs142FinalCost);
	};
	
	/* ******************************************
	******** *Jobs   ************************
	*********************************************/	
	$scope.jobsTabUnlocked = false;
	$scope.isCurrentlyWorking = false;
	
	/* ******************************************
	******** *Burger Flipper  ********************
	*********************************************/	
	
	$scope.mcdonaldsUnlocked = false;
	$scope.jobBurgerFlipperTooltip = "Pretty much the only job someone as dumb as you could get. Cost: 3 knowledge Reward: 1 penny per hour";
	
	$scope.mcdonalds
	
	$scope.jobBurgerFlipper = function(){		
		if($scope.knowledgeCount>=3){
			$scope.mcdonaldsUnlocked = true;
			$scope.knowledgeCount = $scope.knowledgeCount - 3;
			$scope.pennyRate = 	$scope.pennyRate+ 0.006;	
		} else {
				$scope.addEntryToConsole("Not enough knowledge to work there");			 
			}	
	};
	  
	  $scope.isMcdonaldsUnlocked = function () {
		  if($scope.mcdonaldsUnlocked)
		  {
			 return "Hired"; 
		  } else {
			  return " ";
		  }
	  };


	/* ******************************************
	******** *Dynamic content filler ********************
	*********************************************/	
	
	$scope.dynamicEntryCount = 1;
	
	$scope.pencilColorConditions = function() {
		//$scope.getPennyCount()>= $scope.getPencilCost() ? "'btn-primary'" : "'btn-default'" 
		if($scope.getPennyCount()>= $scope.getPencilCost())
		{
			return "btn-primary"
		} else{
			return "btn-default";
		}
		
		
	};
	
	$scope.addEntryToDynamic = function(buttonText){
		$scope.dynamicEntryCount = $scope.dynamicEntryCount +1;
		
		$scope.dynamicList.push({buttonText:buttonText, number:$scope.dynamicEntryCount}); 	
		};
		//Default user console value
		$scope.dynamicList = [
			{buttonText:'Buy pencil',
			getCostFunction: $scope.getPencilCost, 
			toolTip: "Always good to take notes in college.", 
			colorCondition: $scope.pencilColorConditions,
			clickCondition: $scope.increasePencilCount,
			number:0}	
			
			//getPennyCount()>=getPencilCost() ? 'btn-primary': 
		];
	

	
	// End of main function
	} 
]);


