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
	******** * Tick Counter	********************
	*********************************************/	

	var tickTimerVar = setInterval(tickTimer, 100);		
	function tickTimer() {	
		$scope.pennyRate = $scope.jobPennyRate;  //if need to add new way to get penny add here
		$scope.pennyCount =  $scope.pennyCount + $scope.pennyRate;	
		$scope.knowledgeCount = $scope.knowledgeCount + $scope.knowledgeRate;
		
		$scope.updateJobProgressBars();		
	};
	/* ******************************************
	******** * Misc Functions ******************	
	*********************************************/	
	
	$scopeTimeCounter = 0;
	
	// Auto Screen Refresh
	var updateScreenTimerVar = setInterval(updateScreenTimer, 1000);
	function updateScreenTimer() {
	  $scope.$apply(function () {
		   // Updates the screen every second without any user clicking		  
			});
		$scopeTimeCounter +=1;
		if ($scopeTimeCounter >=10){
			$scopeTimeCounter=0;
			$scope.daysCount += 1;			
			$scope.playerEnergy+=25;
			if($scope.playerEnergy>100) {
				$scope.playerEnergy= 100;	
			}
		};
	}

	// Save user state to DB
	$scope.saveUserState = function() {
		
		var myGame = {
			name: $scope.playerName,
			penny: {
				rate: $scope.pennyRate,
				count: $scope.pennyCount,
				unlocked: $scope.pennyUnlocked,
				cost: 1
			},
			pencil: {
				rate: $scope.pencilRate,
				count: $scope.pencilCount,
				unlocked: $scope.pencilUnlocked,
				cost: $scope.pencilCost				
			},
			book: {
				rate: $scope.bookRate,
				count: $scope.bookCount,
				unlocked: $scope.bookUnlocked,
				cost: $scope.bookCost
			}
		}
		$http.post("/users/update", {withCredentials: true, game: myGame})
		.then(
			function success(data) {
				console.log("SUCCESS");
				console.log(data);
			},
			function error(err) {
				console.log("ERROR");
				console.log(err);
			}
		);
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
	******** * Calendar	*****************
	*********************************************/
	$scope.daysCount = 1;
	$scope.yearsCount = 2016;
	
		$scope.getDateName = function (){
		return "Date";
	};
	
	
	$scope.getDate = function(){
		if($scope.daysCount<=31){
			return "January " + $scope.daysCount + " " + $scope.yearsCount;
		}
		else if ($scope.daysCount<=59)
		{
			return "February " + ($scope.daysCount - 31) + " " + $scope.yearsCount;
		}
		else if ($scope.daysCount<=90)
		{
			return "March " + ($scope.daysCount - 59)+ " " +$scope.yearsCount;
		}
		else if ($scope.daysCount<=120)
		{
			return "April " + ($scope.daysCount - 90)+" " + $scope.yearsCount;
		}
		else if ($scope.daysCount<=151)
		{
			return "May " + ($scope.daysCount - 120)+ " " +$scope.yearsCount;
		}
		else if ($scope.daysCount<=181)
		{
			return "June " + ($scope.daysCount - 151)+ " " +$scope.yearsCount;
		}
		else if ($scope.daysCount<=212)
		{
			return "July " + ($scope.daysCount - 181)+ " " +$scope.yearsCount;
		}
		else if ($scope.daysCount<=243)
		{
			return "August " + ($scope.daysCount - 212)+ " " +$scope.yearsCount;
		}
		else if ($scope.daysCount<=273)
		{
			return "September " + ($scope.daysCount - 243)+ " " +$scope.yearsCount;
		}
		else if ($scope.daysCount<=304)
		{
			return "October " + ($scope.daysCount - 273)+ " " +$scope.yearsCount;
		}
		else if ($scope.daysCount<=334)
		{
			return "November " + ($scope.daysCount - 304)+" " + $scope.yearsCount;
		}
		else if ($scope.daysCount<=365)
		{
			return "December " + ($scope.daysCount - 304)+ " " +$scope.yearsCount;
		}
		else{
			$scope.daysCount=1;
			$scope.yearsCount += 1;
			
		}
	}
		
	/* ******************************************
	******** *Energy	*****************
	*********************************************/	
	
	$scope.playerEnergy = 100;
	
	$scope.getPlayerEnergy = function (){
		return $scope.playerEnergy;
	};
	
	
	/* ******************************************
	******** * Base Currencies	*****************
	*********************************************/	
	
	
	/* ******************************************
	******** *Penny		************************
	*********************************************/	
	$scope.pennyCount = 10000;
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
	
	$scope.pennyColorConditions = function (){
		return "btn-primary";
	};
	
	

	

	
	/* ******************************************
	******** *Pencil   ************************
	*********************************************/	
	$scope.pencilCount = 100;	
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
	
	$scope.pencilColorConditions = function() {
		return $scope.getPennyCount()>= $scope.getPencilCost() ? "btn-primary" : "btn-default" 		
	};
	
	$scope.getPencilUnlocked = function (){
		return $scope.pencilUnlocked;
	};
		
	
	

	
	
	/* ******************************************
	******** *Book		************************
	*********************************************/			
	$scope.bookCount= 100;		
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
			$scope.addEntryToConsole("Side Jobs and Class Tabs Unlocked");				 
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

	$scope.bookColorConditions = function() {
		return $scope.getPennyCount()>= $scope.getBookCost() ? "btn-primary" : "btn-default" 		
	};
	
	$scope.getBookUnlocked = function () {
		return $scope.bookUnlocked;
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
	
	 $scope.getKnowledgeUnlocked = function(){
		return  $scope.knowledgeUnlocked; 
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
					$scope.addEntryToConsole("Employment Tab Unlocked");	
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

	$scope.eng101ColorConditions = function(){
			return $scope.getBookCount()>= $scope.getEng101Cost() ? "btn-success": "btn-default"
		};	
	
	$scope.eng101StudyColorConditions = function(){
		if($scope.eng101Count>0 && $scope.pencilCount>= $scope.eng101StudyCost ){
			return "btn-success";
		}else{
			return "btn-default";
		}
	};
	
	$scope.eng101FinalColorConditions = function(){
		if($scope.eng101Count>0 && $scope.pencilCount>= $scope.eng101FinalCost ){
			return "btn-success";
		}else{
			return "btn-default";
		}
	};	

	
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
				$scope.myspaceUnlocked = true;
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
	
	$scope.getCS142Unlocked = function (){
		return $scope.cs142Unlocked;
	};
	
	$scope.cs142ColorConditions = function(){
		return $scope.getBookCount()>= $scope.getCS142Cost() ? "btn-success": "btn-default"
	};	
	
	$scope.cs142StudyColorConditions = function(){
		if($scope.cs142Count>0 && $scope.pencilCount>= $scope.cs142StudyCost ){
			return "btn-success";
		}else{
			return "btn-default";
		}
	};
	
	$scope.cs142FinalColorConditions = function(){
		if($scope.cs142Count>0 && $scope.pencilCount>= $scope.cs142FinalCost ){
			return "btn-success";
		}else{
			return "btn-default";
		}
	};
	
	/* ******************************************
	******** *Jobs   ************************
	*********************************************/	
	$scope.jobsTabUnlocked = false;	
	$scope.jobPennyRate = 0;	
	
	$scope.resetCurrentJob = function()
	{	
		//mcdonalds
		$scope.workingAsMcdonaldsBurgerFlipper = false;
		$scope.workingAsMcdonaldsCashier = false;
		$scope.workingAsMcdonaldsShiftManager = false;
		$scope.workingAsMcdonaldsManager = false;
		//myspace
		$scope.workingAsMyspaceIntern = false;	
		$scope.workingAsMyspaceITSupport = false;
		$scope.workingAsMyspaceSeniorDev = false;
		$scope.workingAsMyspaceCEO = false;
			
	};
	
	
	$scope.updateJobProgressBars = function (){
		//mcdonalds
		if($scope.workingAsMcdonaldsBurgerFlipper && $scope.mcdonaldsProgress <= 100){			
			$scope.mcdonaldsProgress += 0.02;
			};
		if($scope.workingAsMcdonaldsCashier && $scope.mcdonaldsProgress <= 100){			
			$scope.mcdonaldsProgress += 0.04;
			};
		if($scope.workingAsMcdonaldsShiftManager && $scope.mcdonaldsProgress <= 100){			
			$scope.mcdonaldsProgress += 0.08;
			};		
		if(!$scope.mcdonaldsShiftManagerUnlocked && $scope.mcdonaldsProgress >= 33 ){
				$scope.mcdonaldsShiftManagerUnlocked = true;
			};	
		if(!$scope.mcdonaldsManagerUnlocked && $scope.mcdonaldsProgress >= 67 ){
				$scope.mcdonaldsManagerUnlocked = true;
			};				
		if($scope.mcdonaldsProgress > 100){
			$scope.mcdonaldsProgress = 100;
		};
		
		//myspace
		
		if($scope.workingAsMyspaceIntern && $scope.myspaceProgress <= 100){			
			$scope.myspaceProgress += 0.02;
		};
		if($scope.workingAsMyspaceITSupport && $scope.myspaceProgress <= 100){			
			$scope.myspaceProgress += 0.04;
		};
		if($scope.workingAsMyspaceSeniorDev && $scope.myspaceProgress <= 100){			
			$scope.myspaceProgress += 0.08;
		};		
		if(!$scope.myspaceSeniorDevUnlocked && $scope.myspaceProgress >= 33 ){
				$scope.myspaceSeniorDevUnlocked = true;
			};			
		if(!$scope.myspaceCEOUnlocked && $scope.myspaceProgress >= 67 ){
				$scope.myspaceCEOUnlocked = true;
			};				
		if($scope.myspaceProgress > 100){
			$scope.myspaceProgress = 100;
		};
	};

	/* ******************************************
	******** *McDonalds  ********************
	*********************************************/	
	
	$scope.mcdonaldsHired = false;
	$scope.mcdonaldsJobListUnlocked =false;
	$scope.mcdonaldsProgress = 0;
	
	$scope.mcdonaldsShiftManagerUnlocked = false;
	$scope.mcdonaldsManagerUnlocked = false;
	
	$scope.workingAsMcdonaldsBurgerFlipper = false;
	$scope.workingAsMcdonaldsCashier = false;
	$scope.workingAsMcdonaldsShiftManager = false;
	$scope.workingAsMcdonaldsManager = false;

	$scope.applyMcdonalds = function (){	
		if (!$scope.mcdonaldsHired){
			if($scope.knowledgeCount>=3){
				$scope.mcdonaldsHired = true;
					$scope.mcdonaldsJobListUnlocked =true;
				$scope.knowledgeCount = $scope.knowledgeCount - 3;
				
			} else {
					$scope.addEntryToConsole("Not enough knowledge to work there");			 
				}
		} else {
			$scope.addEntryToConsole("You don't need to apply again");		
		}
	};
	
		$scope.mcdonaldsColorConditions = function(){
			if ($scope.mcdonaldsHired ) {
				return "btn-primary";
			}else if($scope.knowledgeCount>=3){
				return "btn-success";
			}else{
				return "btn-default";
			}
			
	};
	  
	  $scope.getMcdonaldsHired = function () {
		  if($scope.mcdonaldsHired)
		  {
			 return "Hired"; 
		  } else {
			  return null;
		  }
	  };
	  
	  $scope.mcdonaldsBurgerFlipper= function(){		 
		$scope.resetCurrentJob();
		$scope.workingAsMcdonaldsBurgerFlipper = true;
		 
		$scope.jobPennyRate = 0.006;		  
	  };
	  
	  
	  $scope.mcdonaldsCashier= function(){
		  if($scope.mcdonaldsProgress>=33){
				$scope.resetCurrentJob();
				$scope.workingAsMcdonaldsCashier = true;
				
				$scope.jobPennyRate = 0.012;
		  }	else {
			  $scope.addEntryToConsole("You need more xp to do that job");	
		  }	
	  };	  
	  	
	  $scope.mcdonaldsShiftManager= function(){
		  if($scope.mcdonaldsProgress>=67){
				$scope.resetCurrentJob();
				$scope.workingAsMcdonaldsShiftManager = true;
				
				$scope.jobPennyRate = 0.024;
		  }	else {
			  $scope.addEntryToConsole("You need more xp to do that job");	
		  }	
	  };	  
	  	  	

  
		$scope.mcdonaldsManager= function(){
		  if($scope.mcdonaldsProgress>=100){
				$scope.resetCurrentJob();
				$scope.workingAsMcdonaldsManager = true;
				
				$scope.jobPennyRate = 0.050;
		  }	else {
			  $scope.addEntryToConsole("You need more xp to do that job");	
		  }	
	  };
	  
	$scope.mcdonaldsBurgerFlipperColorCondition= function(){
	  
	  if($scope.workingAsMcdonaldsBurgerFlipper)
	  {
		  return "btn-success";
	  } else {
		  return "btn-primary";  
	  }
	
  };	
		
  $scope.mcdonaldsCashierColorCondition= function(){	 
	  if($scope.workingAsMcdonaldsCashier)
	  {
		  return "btn-success";
	  } else if ($scope.mcdonaldsProgress>=33){
		    return "btn-primary"
	  } else {
		  return "btn-default";  
	  }
	
  };
	  
	$scope.mcdonaldsShiftManagerColorCondition= function(){	 
	  if($scope.workingAsMcdonaldsShiftManager)
	  {
		  return "btn-success";
	  } else if ($scope.mcdonaldsProgress>=67){
		    return "btn-primary"
	  } else {
		  return "btn-default";  
	  }
	
  };
  	  	
	$scope.mcdonaldsManagerColorCondition= function(){	 
	  if($scope.workingAsMcdonaldsManager)
	  {
		  return "btn-success";
	  } else if ($scope.mcdonaldsProgress>=100){
		    return "btn-primary"
	  } else {
		  return "btn-default";  
	  }
	
	};
  
	  $scope.getMcdonaldsProgressRound = function (){
		  return Math.round($scope.mcdonaldsProgress * 10)/10;
	  };
	  
	  $scope.getMcdonaldsJobListUnlocked = function (){
		return $scope.mcdonaldsJobListUnlocked;
	}
	
	$scope.getMcdonaldsShiftManagerUnlocked = function (){
		return $scope.mcdonaldsShiftManagerUnlocked;
	};
	
	$scope.getMcdonaldsManagerUnlocked = function (){
		return $scope.mcdonaldsManagerUnlocked;
	};
	
	
	
		/* ******************************************
	******** *MySpace  ********************
	*********************************************/	
	
	$scope.myspaceUnlocked = false;	
	$scope.myspaceHired = false;
	$scope.myspaceJobListUnlocked =false;
	$scope.myspaceProgress = 0;
	
	$scope.myspaceSeniorDevUnlocked = false;
	$scope.myspaceCEOUnlocked =false;
	
	$scope.workingAsMyspaceIntern = false;	
	$scope.workingAsMyspaceITSupport = false;
	$scope.workingAsMyspaceSeniorDev = false;
	$scope.workingAsMyspaceCEO = false;
	
	$scope.applyMyspace = function (){	
		if (!$scope.myspaceHired){
			if($scope.knowledgeCount>=30){
				$scope.myspaceHired = true;
				$scope.myspaceJobListUnlocked =true;
				$scope.knowledgeCount -= 30;
				
			} else {
					$scope.addEntryToConsole("Not enough knowledge to work there");			 
				}
		} else {
			$scope.addEntryToConsole("You don't need to apply again");		
		}
	};
	
		$scope.myspaceColorConditions = function(){
			if ($scope.myspaceHired ) {
				return "btn-primary";
			}else if($scope.knowledgeCount>=30){
				return "btn-success";
			}else{
				return "btn-default";
			}
			
	};
	  
	  $scope.getMyspaceHired = function () {
		  if($scope.myspaceHired)
		  {
			 return "Hired"; 
		  } else {
			  return null;
		  }
	  };
	  
	  
	$scope.myspaceIntern= function(){		 
		$scope.resetCurrentJob();
		$scope.workingAsMyspaceIntern = true;		 
		$scope.jobPennyRate = 0.001;		  
	  };
	  
	$scope.myspaceInternColorCondition= function(){	  
	  if($scope.workingAsMyspaceIntern)
	  {
		  return "btn-success";
	  } else {
		  return "btn-primary";  
	  }
	
  };	
	  
	  
	  $scope.myspaceITSupport= function(){
		  if($scope.myspaceProgress>=33){
				$scope.resetCurrentJob();
				$scope.workingAsMyspaceITSupport = true;				
				$scope.jobPennyRate = 0.050;
		  }	else {
			  $scope.addEntryToConsole("You need more xp to do that job");	
		  }	
	  };


	$scope.myspaceITSupportColorCondition= function(){	 
	  if($scope.workingAsMyspaceITSupport)
	  {
		  return "btn-success";
	  } else if ($scope.myspaceProgress>=33){
		    return "btn-primary"
	  } else {
		  return "btn-default";  
	  }
	
  };	  
	  	
	  $scope.myspaceSeniorDev= function(){
		  if($scope.myspaceProgress>=67){
				$scope.resetCurrentJob();
				$scope.workingAsMyspaceSeniorDev = true;				
				$scope.jobPennyRate = 0.075;
		  }	else {
			  $scope.addEntryToConsole("You need more xp to do that job");	
		  }	
	  };	 

  $scope.myspaceSeniorDevColorCondition= function(){	 
	  if($scope.workingAsMyspaceSeniorDev)
	  {
		  return "btn-success";
	  } else if ($scope.myspaceProgress>=67){
		    return "btn-primary"
	  } else {
		  return "btn-default";  
	  }
	
  };	  
	  	  	

  
  $scope.myspaceCEO= function(){
		  if($scope.myspaceProgress>=100){
				$scope.resetCurrentJob();
				$scope.workingAsMyspaceCEO= true;				
				$scope.jobPennyRate = 0.100;
		  }	else {
			  $scope.addEntryToConsole("You need more xp to do that job");	
		  }	
	  };  
	
  $scope.myspaceCEOColorCondition= function(){	 
	  if($scope.workingAsMyspaceCEO)
	  {
		  return "btn-success";
	  } else if ($scope.myspaceProgress>=100){
		    return "btn-primary"
	  } else {
		  return "btn-default";  
	  }
	
  };
		

  
	  $scope.getMyspaceProgressRound = function (){
		  return Math.round($scope.myspaceProgress * 10)/10;
	  };
	  
	
	
	$scope.getMyspaceUnlocked = function (){
		return $scope.myspaceUnlocked;
	};
		
	$scope.getMyspaceJobListUnlocked = function (){
		return $scope.myspaceJobListUnlocked;
	};
	
	
	$scope.getMyspaceSeniorDevUnlocked  = function(){
		return $scope.myspaceSeniorDevUnlocked;
	};	
	
	$scope.getMyspaceCEOUnlocked = function (){
		return $scope.myspaceCEOUnlocked;
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
	******** *Side Jobs ********************
	*********************************************/
	
	$scope.sideJobTutor = function (){
		
	};
	
	$scope.sideJobSummerSales = function (){
		
	};
	
	$scope.sideJobsList = [
		{
			buttonText:"Tutor a classmate",
			toolTip:"temp",
			clickCondition:$scope.sideJobTutor,
			
		},
		{
			buttonText:"Summer Sales",
			toolTip:"temp2",
			clickCondition:$scope.sideJobSummerSales,
			
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
	
	// End of main function
	} 
]);


