function createPlayer(name, emoji, symbol){
    //create a player object here
    let myScore = 0;
    
    return {
        getName(){
            return name;
        },
        getEmoji(){
            return emoji;
        },
        getSymbol(){
            return symbol;
        },
        addScore(){
            myScore++;
        },
        getScore(){
            return myScore
        }
    }

}

const gameBoard = (()=>{
    //create the new game board that stores board info & funcs
    const boardSquare =
    [["", "", ""],
    ["", "", ""],
    ["", "", ""]];

    function setSquare(arrX, arrY){

    }
    function getBoard(){
        return boardSquare;
    }
    return {setSquare, getBoard}
})();

const gameManger = (()=>{
    //create a game manager that deals with game logic
    let isPlayer1Turn = false; // keeps track of whos turn it is

    function changeTurns(){
        //Swap whos turn it is
        isPlayer1Turn = !isPlayer1Turn;
    }

    function checkTurn(){
        //check whos turn it currently is
        if(isPlayer1Turn){
            console.log("Is is player 1's turn");
        }
        else{
            console.log("Is is player 2s's turn");
        }
        return isPlayer1Turn;
    }

    return {changeTurns, checkTurn}

})();

const player1 = createPlayer("p1", "happy", "x");
const player2 = createPlayer("p2", "mad", "o");