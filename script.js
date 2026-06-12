function createPlayer(name, emoji, symbol){
    //create a player object here
    let myScore = 0;
    let mySymbol = symbol;
    let myName = name;
    let myEmoji = emoji
    function setName(m_name){
        myName = m_name;
    }
    function getName(){
        return myName;
    }
    function setEmoji(m_emoji){
        myEmoji = m_emoji;
    }
    function getEmoji(){
        return myEmoji;
    }
    function setSymbol(m_symbol){
        m_symbol = mySymbol
    }
    function getSymbol(){
        return mySymbol
    }
    function addScore(){
        myScore++;
    }
    function getScore(){
        return myScore;
    }
    return {getName, getEmoji, getScore, addScore, getSymbol, setSymbol};

}

const gameBoard = (()=>{
    const _boardTiles = new Array(9); //references to the game board tiles
    /* Gameboard tiles
        [0,1,2]
        [3,4,5]
        [6,7,8]
    */
    let _freeTileSpaces = 9;

    
    function resetTiles(){
        for(let i = 0; i < _boardTiles.length; i++){
            _boardTiles[i] = "";
        }
        _freeTileSpaces = 9;
    }
    function setTile(m_tileNum){
        //if not filled in space then fill with current players symbol
        if(_boardTiles[m_tileNum] === ""){
            _boardTiles[m_tileNum] = gameManger.checkTurn()? player1.getSymbol() : player2.getSymbol();//either returns a false or true
            gameManger.changeTurns();
            _freeTileSpaces -- ; // one less free tile space
            if(_freeTileSpaces < 5){
                checkBoardWin(); // check if there is a winner
            }
        }
        else{
            console.log("Tile is already filled with: " + _boardTiles[m_tileNum]);
        }
        
    }
    function getBoard(){
        return _boardTiles;
    }
    function checkBoardWin(){
        //check when 
        console.log("Check board winner");
        // if(player1Won){
        //     return 1;
        // }
        // else if(player2Won){
        //     return 2;
        // }
        // else{
        //     return 0; // no one one
        // }
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
        console.log(`It is ${isPlayer1Turn === true ? "Player 1": "Player 2"}'s turn`);
    }

    function checkTurn(){
        //check whos turn it currently is
        return isPlayer1Turn;
    }

    function playRound(){
        //Randomly select whos first 
        const randomInt = Math.floor(Math.random() * 2);
        player1.setSymbol(randomInt === 0 ? "X": "O");
        player2.setSymbol(randomInt === 0 ? "O": "X");
        isPlayer1Turn = (randomInt === 0); //if 0 player one goes first
        if(randomInt === 0){
            //player 1 goes first

        }
        else{
            //player 2 goes first

        }
        console.log(`it is ${isPlayer1Turn ? "Player 1" : "player 2"}'s turn to go first`);
        //let first player select a square and fill with their symbol

        //let next player select a square

        //repeat taking turns until ...

        //after 5 turns start checking win condition

        //if someone wins add to their score
        //exit the game loop and ask if they want to play again
    }

    return {changeTurns, checkTurn, playRound};

})();

const player1 = createPlayer("p1", "happy", "X");
const player2 = createPlayer("p2", "mad", "O");