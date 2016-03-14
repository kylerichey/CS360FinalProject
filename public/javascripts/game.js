$(document).ready(function(){
	var pennyAmount=0;
	var pencilAmount=0;
	var pennyRate = 0;	
	var tickTimerVar = setInterval(tickTimer, 50);		
	function tickTimer() {
		//console.log("Tick Counter");
		pennyRate = pencilAmount/50;
		pennyRate = Math.round(pennyRate * 1000) / 1000
		pennyAmount += pennyRate;
		pennyAmount=Math.round(pennyAmount * 100) / 100
		
	}
	
	var updateScreenTimerVar = setInterval(updateScreenTimer, 1000);		
	function updateScreenTimer() {		
		$("#pennyCount").html( "Penny: "+pennyAmount + " (" + Math.round(pennyRate*25*1000)/1000 + "/s)");
		$("#pencilCount").html( "Pencil: "+pencilAmount);
		
	}	
	
		var infoBoxTimerVar = setInterval(infoBoxTimer, 5000);		
	function infoBoxTimer() {	
	$("#infoBox").html("");
	}
	
	$("#getPenny").click(function(){ 		
		pennyAmount += 1;
		updateScreenTimer();
		//console.log(pennyAmount);
	});	
	$("#pennyToPencil").click(function(){ 
		if(pennyAmount>9){
			pencilAmount += 1;
			pennyAmount -= 10;	
			
		} else {
			$("#infoBox").html("You don't have enough penny");			
		}
		
	});	
});