function createPlayer(name, emoji, symbol){
    //create a player object here
    let myScore = 0;
    let mySymbol = symbol;
    let myName = name;
    let myEmoji = emoji
    let _isFirstPlayer = false;
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
    function setFirstPlayer(m_isFirst){
        _isFirstPlayer = m_isFirst;
    }
    function getFirstPlayer(){
        return _isFirstPlayer;
    }
    return {getName, getEmoji, getScore, addScore, getSymbol, setSymbol, getFirstPlayer, setFirstPlayer};

}

const gameBoard = (()=>{
    const _boardTiles = [
        ["","",""],
        ["","",""],
        ["","",""]
    ]
    let _freeTileSpaces = 9;


    function resetTiles(){
        for(let i = 0; i < _boardTiles.length; i++){
            for(let j = 0; j < _boardTiles[i].length; j++){
                _boardTiles[i][j] = "";
            }
        }
        _freeTileSpaces = 9;
    }
    function setTile(m_tileX, m_tileY){
        if(gameManger.getWinner() > 0){
            console.log("Game is already over");
            return;
        }
        //if not filled in space then fill with current players symbol
        if(_boardTiles[m_tileX][m_tileY] === ""){
            _boardTiles[m_tileX][m_tileY] = gameManger.checkTurn()? player1.getSymbol() : player2.getSymbol();//either returns a false or true
            gameManger.changeTurns();
            _freeTileSpaces -- ; // one less free tile space
            if(_freeTileSpaces < 5){
                checkBoardWin(); // check if there is a winner
            }
        }
        else{
            console.log("Tile is already filled with: " + _boardTiles[m_tileX][m_tileY]);
        }
        
    }
    function getBoard(){
        return _boardTiles;
    }
    function checkBoardWin(){
        //check when 
        console.log("Check board winner");
        let m_winner = 0; // 0 - no one won ; 1 - player 1 ; 2 - player 2 
        let m_winnerSymbol = "";
        //0,0
        if((_boardTiles[0][0] == _boardTiles[0][1] && _boardTiles[0][0] == _boardTiles[0][2]) //top side line
        || (_boardTiles[0][0] == _boardTiles[1][0] && _boardTiles[0][0] == _boardTiles[2][0]) //left side line
        ){
            m_winnerSymbol = _boardTiles[0][0];
        }
        //1,1
        else if((_boardTiles[1][1] == _boardTiles[0][0] && _boardTiles[1][1] == _boardTiles[2][2]) //top left to bottom right
        || (_boardTiles[1][1] == _boardTiles[0][2] && _boardTiles[1][1] == _boardTiles[2][0]) //top right to bottom left
        || (_boardTiles[1][1] == _boardTiles[1][0] && _boardTiles[1][1] == _boardTiles[1][2]) //middle left to middle right
        || (_boardTiles[1][1] == _boardTiles[0][1] && _boardTiles[1][1] == _boardTiles[2][1])) //middle top to middle bottom
        {
            m_winnerSymbol = _boardTiles[1][1];
        }
        //2,2
        else if((_boardTiles[2][2] == _boardTiles[1][2] && _boardTiles[2][2] == _boardTiles[0][2]) //right side line
            ||(_boardTiles[2][2] == _boardTiles[2][1] && _boardTiles[2][2] == _boardTiles[2][0]) //bottom side line
        ){
            m_winnerSymbol = _boardTiles[2][2];
        }


        if(m_winnerSymbol != ""){
            gameManger.setWinner(m_winnerSymbol === player1.getSymbol() ? 1 : 2);
        }
        else{
            console.log("no winner yet")
        }


    }
    resetTiles(); //initialize tiles to empty strings
    return {setTile, getBoard, resetTiles};
})();

const gameManger = (()=>{
    //create a game manager that deals with game logic
    let isPlayer1Turn = false; // keeps track of whos turn it is

    //keep track of game winner / if game is over
    let gameWinner = 0; // 0 = no winner ; 1 = player 1 ; 2 = player 2
    function changeTurns(){
        //Swap whos turn it is
        isPlayer1Turn = !isPlayer1Turn;
        console.log(`It is now ${isPlayer1Turn === true ? "Player 1": "Player 2"}'s turn`);
    }

    function checkTurn(){
        //check whos turn it currently is
        return isPlayer1Turn;
    }

    function startRound(){
        //Randomly select whos first 
        const randomInt = Math.floor(Math.random() * 2);
        player1.setSymbol(randomInt === 0 ? "X": "O");
        player2.setSymbol(randomInt === 0 ? "O": "X");
        isPlayer1Turn = (randomInt === 0); //if 0 player one goes first
        console.log(`it is ${isPlayer1Turn ? "Player 1" : "player 2"}'s turn to go first`);
        //let first player select a square and fill with their symbol

        //let next player select a square

        //repeat taking turns until ...

        //after 5 turns start checking win condition

        //if someone wins add to their score
        //exit the game loop and ask if they want to play again
    }
    function setWinner(_winner){
        gameWinner = _winner;
        if(gameWinner === 1 || gameWinner === 2){
            console.log(`${gameWinner === 1 ? player1.getName() : player2.getName()} won the game`);
        }
    }
    function getWinner(){
        return gameWinner;
    }
    return {changeTurns, checkTurn, startRound, setWinner, getWinner};

})();

const player1 = createPlayer("tloko", "happy", "X");
const player2 = createPlayer("p2", "mad", "O");