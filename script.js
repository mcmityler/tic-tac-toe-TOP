function createPlayer(name, emoji){
    //create a player object here
    let myScore = 0;
    function getName(){
        return name;
    }
    function getEmoji(){
        return emoji;
    }
    function addScore(){
        myScore++;
    }
    function getScore(){
        return myScore;
    }
    return {getName, getEmoji, getScore, addScore};

}

const gameBoard = (()=>{
    const _boardTiles = new Array(9); //references to the game board tiles
    /* Gameboard tiles
        [0,1,2]
        [3,4,5]
        [6,7,8]
    */

    const _symbols = ["X","O"]; //if you are first you get X if you are second you get O
    function resetTiles(){
        for(let i = 0; i < _boardTiles.length; i++){
            _boardTiles[i] = "";
        }
    }
    function setTile(m_tileNum){
        //if not filled in space then fill with current players symbol
        if(_boardTiles[m_tileNum] === ""){
            _boardTiles[m_tileNum] = _symbols[(gameManger.checkTurn()? 1 : 0)] //either returns a false or true
            gameManger.changeTurns();
        }
        else{
            console.log("Tile is already filled with: " + _boardTiles[m_tileNum]);
        }
        
    }
    function getBoard(){
        return _boardTiles;
    }
    resetTiles(); //initialize tiles to empty strings
    return {setTile, getBoard, resetTiles};
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
        console.log(`Is is ${isPlayer1Turn ? "Player 1": "Player 2"}'s turn`);
        return isPlayer1Turn;
    }

    function playRound(){
        //Randomly select whos first

        //let first player select a square and fill with their symbol

        //let next player select a square

        //repeat taking turns until ...

        //after 5 turns start checking win condition

        //if someone wins add to their score
        //exit the game loop and ask if they want to play again
    }

    return {changeTurns, checkTurn, playRound};

})();

const player1 = createPlayer("p1", "happy");
const player2 = createPlayer("p2", "mad");