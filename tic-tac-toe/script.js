/*
Tic-Tac-Toe is about Os and Xs or noughts and crosses . 
The rule of the game is very simple. On a 3x3 grid, a player has to match 3 consecutive Os or Xs horizontally/vertically/diagonally.
*/

var origBoard; //keep track of X and O. what's in each square board 
const huPlayer = 'O'; //human player 
const aiPlayer = 'X'; //ai player
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]; //array of arrays for winning combination 

const cells = document.querySelectorAll('.cell'); 

function startGame() {
	document.querySelector(".endgame").style.display = "none"; 
    origBoard = Array.from(Array(9).keys()); 
    // console.log(origBoard);
	for (var i = 0; i < cells.length; i++) { 
		cells[i].innerText = ''; //set to nothing
		cells[i].style.removeProperty('background-color'); 
		cells[i].addEventListener('click', turnClick, false); //calling turnClick fn 
	}
}

function turnClick(square) {
    // console.log(square.target.id); 
    
	if (typeof origBoard[square.target.id] == 'number') { //later-gameWin
		turn(square.target.id, huPlayer) //its human player playing his/her turn
        if (!checkTie()) turn(bestSpot(), aiPlayer); //later-gameWin
	}
}

function turn(squareId, player) { 
	origBoard[squareId] = player; 
	document.getElementById(squareId).innerText = player; 
	let gameWon = checkWin(origBoard, player) 
	if (gameWon) gameOver(gameWon) 
}

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) => 
		(e === player) ? a.concat(i) : a, []); 
	let gameWon = null; 
	for (let [index, win] of winCombos.entries()) { 
		if (win.every(elem => plays.indexOf(elem) > -1)) { 
			gameWon = {index: index, player: player}; 
			break; 
		}
	}
	return gameWon; 
}

function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) { 
		document.getElementById(index).style.backgroundColor =
			gameWon.player == huPlayer ? "#4d4c7d" : "#eb4559"; 
	}
	for (var i = 0; i < cells.length; i++) { 
		cells[i].removeEventListener('click', turnClick, false); 
	}
	declareWinner(gameWon.player == huPlayer ? "You Win!" : "Loser, Computer Won!"); 
}

function declareWinner(who) { 
	document.querySelector(".endgame").style.display = "block"; 
	document.querySelector(".endgame .text").innerText = who; 
}

function emptySquares() {
	return origBoard.filter(s => typeof s == 'number'); 
}

function bestSpot() {
	return emptySquares()[0]; 
}

function checkTie() {
	if (emptySquares().length == 0) { 
		for (var i = 0; i < cells.length; i++) { 
			cells[i].style.backgroundColor = "#639a67"; 
			cells[i].removeEventListener('click', turnClick, false); 
		}
		declareWinner("Tie Game!") 
		return true; 
	}
	return false; 
}
