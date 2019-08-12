/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/




var score ,roundScore ,activePlayer ,gamePlaying,previous_dice,dice_1,dice_2;

init();




document.querySelector('.btn-roll').addEventListener('click',function(){
	//Do something here
	if(gamePlaying){


	var dice=Math.ceil(Math.random()*6);
	if(previous_dice===6 & dice===6){
		document.querySelector('#score-'+activePlayer).textContent =0;
	}
	var diceDOM = document.querySelector(".dice");
	diceDOM.style.display = 'block';
	diceDOM.src = 'dice-'+dice +'.png';

	previous_dice = dice;
	if(dice !== 1){
		roundScore+=dice;
		document.querySelector('#current-'+activePlayer).textContent = roundScore;
	}else{
		if(activePlayer===1){
			dice_1 = previous_dice;
		}
		else{
			dice_2 = previous_dice;
		}
		nextPlayer();


	}

}

});


document.querySelector('.btn-hold').addEventListener('click',function(){
	if(gamePlaying){
	score[activePlayer] += roundScore;
	document.querySelector('#score-'+activePlayer).textContent = score[activePlayer];
	
	if(score[activePlayer]>= 20 ){
		document.querySelector("#name-"+ activePlayer).textContent = 'Winner!';
		document.querySelector('.dice').style.display = 'none';
		document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner')
		document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active')
		gamePlaying = false;
	}else{

	nextPlayer();	
	}
	}


});

function nextPlayer(){
		activePlayer === 0 ? activePlayer =1 : activePlayer =0;
		roundScore = 0;
		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';

		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');

		document.querySelector('.dice').style.display = 'none';
		

};

document.querySelector('.btn-new').addEventListener('click',init);

function init(){
	score = [ 0 ,0 ];
	activePlayer = 0 ;
	roundScore = 0;	
	gamePlaying = true;
	previous_dice =0
	document.querySelector('.dice').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById("name-0").textContent = 'Player 1';
	document.getElementById("name-1").textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner')
	document.querySelector('.player-1-panel').classList.remove('winner')
	document.querySelector('.player-0-panel').classList.remove('active')
	document.querySelector('.player-1-panel').classList.remove('active')
	document.querySelector('.player-0-panel').classList.add('active')
}