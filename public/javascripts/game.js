angular.module('studentGame', []) 
.controller('MainCtrl', [ 
'$scope','$http', 
function($scope,$http){ 

	$scope.pennyCount = 110;
	$scope.pennyTooltip = "You use penny to buy things";
	$scope.pencilTooltip ="One pencil costs 10 penny";
	$scope.bookTooltip = "One book costs 20 penny";
	$scope.Eng101Tooltip = "The first class of any respectable college student. Cost: 3 book";
	$scope.pencilCount = 0;
	$scope.pencilUnlocked = false;
	$scope.bookUnlocked = false;
	$scope.bookCount= 0;
	$scope.timer = "waiting for change";	
	$scope.gameOutputConsoleEntryCount = 0;
	$scope.jobsTabUnlocked = false;
	$scope.classTabUnlocked = false;
	$scope.knowledgeCount = 0;
	$scope.knowledgeRate = 0;
	$scope.knowledgeUnlocked = false;
	$scope.playerName = "Kyle";
	$scope.playerBodyLevel = "Far Below Average";
	$scope.jobBurgerFlipperTooltip = "Pretty much the only job someone as dumb as you could get. Cost: 3 knowledge Reward: 1 penny per hour";
	$scope.pennyRate = 0;

	
	$scope.getPlayerName = function(){
		return $scope.playerName;
	};
	
	$scope.getPlayerBodyLevel = function(){
		return $scope.playerBodyLevel;
	};
	
	$scope.gameOutputConsoleList = [
		{content:'You are a poor student wandering through college', number:0}, 		
	];

	$scope.jobBurgerFlipper = function(){
		
		if($scope.knowledgeCount>3){
			$scope.knowledgeCount = $scope.knowledgeCount - 3;
			$scope.pennyRate = 	$scope.pennyRate+ 0.006;	
		}
		else{
			$scope.gameOutputConsoleEntryCount = $scope.gameOutputConsoleEntryCount +1;
			 $scope.gameOutputConsoleList.push({content:"Not enough knowledge to work there", number:$scope.gameOutputConsoleEntryCount}); 				
			}		
		
	};
	  
	  
	$scope.increasePennyCount = function() {
	$scope.pennyCount = $scope.pennyCount + 1;
		if($scope.pennyCount>9){
			$scope.pencilUnlocked = true;					
		}			
	};

	$scope.increasePencilCount = function() {
			if($scope.pennyCount>9){					
				$scope.pennyCount = $scope.pennyCount -10;
				$scope.pencilCount = $scope.pencilCount + 1;
				$scope.bookUnlocked =true;
			}
			else{
			$scope.gameOutputConsoleEntryCount = $scope.gameOutputConsoleEntryCount +1;
			 $scope.gameOutputConsoleList.push({content:"Not enough penny to buy pencil", number:$scope.gameOutputConsoleEntryCount}); 				
			}			
		};

	$scope.increaseBookCount = function() {
	if($scope.pennyCount>19){					
		$scope.pennyCount = $scope.pennyCount -20;
		$scope.bookCount = $scope.bookCount + 1;
		 if(!$scope.classTabUnlocked){
			 $scope.classTabUnlocked = true;
			 $scope.gameOutputConsoleEntryCount = $scope.gameOutputConsoleEntryCount +1;
			$scope.gameOutputConsoleList.push({content:"Class Tab Unlocked", number:$scope.gameOutputConsoleEntryCount}); 	
			 
		 }
		
	}
	else{
		$scope.gameOutputConsoleEntryCount = $scope.gameOutputConsoleEntryCount +1;
		$scope.gameOutputConsoleList.push({content:"Not enough penny to buy book", number:$scope.gameOutputConsoleEntryCount}); 		
		}			
	};
	
	
	$scope.classEng101 = function() { 
		if($scope.bookCount>2){
			$scope.bookCount = $scope.bookCount - 3;
			$scope.knowledgeRate = $scope.knowledgeRate + 0.006;			
			$scope.knowledgeUnlocked = true;
			$scope.jobsTabUnlocked = true;
				
			
		}
		else {
			$scope.gameOutputConsoleEntryCount = $scope.gameOutputConsoleEntryCount +1;
		$scope.gameOutputConsoleList.push({content:"Not enough book to take ENG 101", number:$scope.gameOutputConsoleEntryCount}); 	
		}
	};
	
	
	$scope.getKnowledgeCount = function(){
		return  Math.round($scope.knowledgeCount *100)/100;	
			
	};
	
	$scope.getKnowledgeRate = function(){
		return $scope.knowledgeRate * 100;
	};
	
	$scope.getPennyRate = function(){
		return $scope.pennyRate * 100;
	};

var updateScreenTimerVar = setInterval(updateScreenTimer, 1000);
	function updateScreenTimer() {
	  $scope.$apply(function () {
           // Updates the screen every second without any user clicking
        });
	}
	
	var tickTimerVar = setInterval(tickTimer, 100);		
	function tickTimer() {	
		$scope.pennyCount =  $scope.pennyCount + $scope.pennyRate;	
		$scope.knowledgeCount = $scope.knowledgeCount + $scope.knowledgeRate;
	

	
	


	}
	} 

]);