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
        if(gameManager.getWinner() > 0){
            console.log("Game is already over");
            return;
        }
        //if not filled in space then fill with current players symbol
        if(_boardTiles[m_tileX][m_tileY] === ""){
            const m_symbol = gameManager.checkTurn()? player1.getSymbol() : player2.getSymbol();
            _boardTiles[m_tileX][m_tileY] = m_symbol;
            gameDisplay.updateTile(m_tileX, m_tileY, m_symbol)
            console.log(`clicked [${m_tileX}, ${m_tileY}]`)
            gameManager.changeTurns();
            gameDisplay.updateTurnText();
            _freeTileSpaces -- ; // one less free tile space
            if(_freeTileSpaces < 5){
                if(checkBoardWin() === false){
                    if(_freeTileSpaces === 0){
                        gameManager.setWinner(3); //tie game 
                    }
                }
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

        //[0,0] top left tile
        if(_boardTiles[0][0] === _boardTiles[0][1]
            && _boardTiles[0][0] === _boardTiles[0][2] && _boardTiles[0][0] != ""){
            //top side line
            m_winnerSymbol = _boardTiles[0][0];
            gameDisplay.highlightWiningLines(0,0,0,1,0,2);
            
        } 
        else if(_boardTiles[0][0] === _boardTiles[1][0]
            && _boardTiles[0][0] === _boardTiles[2][0] && _boardTiles[0][0] != ""){
            //left side line
            m_winnerSymbol = _boardTiles[0][0];
            gameDisplay.highlightWiningLines(0,0,1,0,2,0);
        } 

        //[1,1] middle tile
        else if(_boardTiles[1][1] === _boardTiles[0][0]
            && _boardTiles[1][1] === _boardTiles[2][2] && _boardTiles[1][1] != ""){
            //top left to bottom right diagonal
            m_winnerSymbol = _boardTiles[1][1];
            gameDisplay.highlightWiningLines(0,0,1,1,2,2);
        }
        else if(_boardTiles[1][1] === _boardTiles[0][2]
            && _boardTiles[1][1] === _boardTiles[2][0] && _boardTiles[1][1] != ""){
            //top right to bottom left diagonal
            m_winnerSymbol = _boardTiles[1][1];
            gameDisplay.highlightWiningLines(1,1,0,2,2,0);
        }
        else if(_boardTiles[1][1] === _boardTiles[1][0]
            && _boardTiles[1][1] === _boardTiles[1][2] && _boardTiles[1][1] != ""){
            //middle left to middle right line
            m_winnerSymbol = _boardTiles[1][1];
            gameDisplay.highlightWiningLines(1,1,1,0,1,2);
        }
        else if(_boardTiles[1][1] === _boardTiles[0][1]
            && _boardTiles[1][1] === _boardTiles[2][1] && _boardTiles[1][1] != ""){
            //middle top to middle bottom line
            m_winnerSymbol = _boardTiles[1][1];
            gameDisplay.highlightWiningLines(1,1,0,1,2,1);
        }

        //[2,2] bottom right tile
        else if(_boardTiles[2][2] === _boardTiles[1][2] 
            && _boardTiles[2][2] === _boardTiles[0][2] && _boardTiles[2][2] != ""){
            //right side line
            m_winnerSymbol = _boardTiles[2][2];
            gameDisplay.highlightWiningLines(2,2,1,2,0,2);
        }
        else if(_boardTiles[2][2] === _boardTiles[2][1]
            && _boardTiles[2][2] === _boardTiles[2][0] && _boardTiles[2][2] != ""){
            //bottom side line
            m_winnerSymbol = _boardTiles[2][2];
            gameDisplay.highlightWiningLines(2,2,2,1,2,0);
        }


        if(m_winnerSymbol != ""){
            gameManager.setWinner(m_winnerSymbol === player1.getSymbol() ? 1 : 2);
            if(m_winnerSymbol === player1.getSymbol()){
                player1.addScore();
            }
            else{
                player2.addScore();
            }
            gameDisplay.updateScoreText();
            return true;
        }
        else{
            console.log("no winner yet")
            return false;
        }

    }
    resetTiles(); //initialize tiles to empty strings
    return {setTile, getBoard, resetTiles};
})();

const gameManager = (()=>{
    //create a game manager that deals with game logic
    let isPlayer1Turn = false; // keeps track of whos turn it is

    //keep track of game winner / if game is over
    let gameWinner = 0; // 0 = no winner ; 1 = player 1 ; 2 = player 2 ; 3 = tie game
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
        isPlayer1Turn = (randomInt === 0); //if 0 player one goes first
        gameDisplay.updateTurnText();
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
        gameDisplay.updateTurnText();
    }
    function getWinner(){
        return gameWinner;
    }
    function resetGame(){
        gameBoard.resetTiles();
        gameDisplay.resetBoard();
        setWinner(0);
        startRound();
    }
    return {changeTurns, checkTurn, startRound, setWinner, getWinner, resetGame};
})();

const gameDisplay = (() => {
    const myBoardDiv = document.getElementById("gameboard");
    let myTileButtons = [[],[],[]]; //array of tile buttons to recall later
    const myTurnText = document.querySelector(".turn-display");
    const myStartButton = document.querySelector(".start-game-button");
    const myStartDialog = document.querySelector(".starting-dialog");
    const myStartForm = document.querySelector("#start-form");

    const myP1Score = document.querySelector(".p1-score");
    const myP2Score = document.querySelector(".p2-score");
    const myP1Name = document.querySelector(".p1-name");
    const myP2Name = document.querySelector(".p2-name");
    const myP1Emoji = document.querySelector(".p1-pfp");
    const myP2Emoji = document.querySelector(".p2-pfp");
    const myRestartButton = document.querySelector(".restart-button");

    
    myRestartButton.addEventListener("click", gameManager.resetGame);
    myStartDialog.addEventListener("submit", startGameInput);

    function resetBoard(){
        myBoardDiv.textContent = "";
        myTileButtons = [[],[],[]]; //clear board back to empty
        for (let i = 0; i < gameBoard.getBoard().length; i++) {
            for (let j = 0; j < gameBoard.getBoard()[i].length; j++) {
                const m_newButton = document.createElement("button");
                m_newButton.classList.add("not-filled", "pointer-cursor");
                m_newButton.addEventListener("click", ()=>{gameBoard.setTile(i,j)});
                myTileButtons[i][j] = m_newButton;
                myBoardDiv.append(myTileButtons[i][j]);
            }
        }
    }
    function updateTile(arrX, arrY, symbol){
        myTileButtons[arrX][arrY].classList.remove("not-filled", "pointer-cursor");

        myTileButtons[arrX][arrY].classList.add("size-up");
        myTileButtons[arrX][arrY].textContent = symbol;
    }
    function updateTurnText(){
        if(gameManager.getWinner() > 0){
            myTurnText.textContent = gameManager.getWinner() === 1 ? player1.getName() + " won" : gameManager.getWinner() === 2 ? player2.getName() + " won": "Tie Game";
        }
        else{
            myTurnText.textContent = `It is ${gameManager.checkTurn() === true ? player1.getName() : player2.getName()}'s turn 
        (${gameManager.checkTurn() === true ? player1.getSymbol() : player2.getSymbol()}'s) `
        }
    }
    function updateEmoticon(){
        //empty lists
        myP1Emoji.classList = ""; 
        myP2Emoji.classList = ""; 
        myP1Emoji.classList = `fa-solid ${player1.getEmoji()}`; 
        myP2Emoji.classList = `fa-solid ${player2.getEmoji()}`; 
    }
    function updateScoreText(){
        myP1Name.textContent = player1.getName();
        myP2Name.textContent = player2.getName();
        myP1Score.textContent = player1.getScore();
        myP2Score.textContent = player2.getScore();
    }
    function startGameInput(event){
        // 1. Prevent the default browser page reload
        event.preventDefault(); 
        
        // 2. Instantiate FormData by passing the form element
        const formData = new FormData(event.target); 

        const m_p1Name = formData.get('player1-name') === "" ? "Player 1" :  formData.get('player1-name')
        const m_p1Emoji = formData.get('p1-emoji-input') === "" ? "fa-face-smile" :  formData.get('p1-emoji-input')
        const m_p2Name = formData.get('player2-name') === "" ? "Player 2" :  formData.get('player2-name')
        const m_p2Emoji = formData.get('p2-emoji-input') === "" ? "fa-face-smile" :  formData.get('p2-emoji-input')
        player1 = createPlayer(m_p1Name, formData.get('p1-emoji-input'), "X");
        player2 = createPlayer(m_p2Name, formData.get('p2-emoji-input'), "O");

        gameManager.startRound();
        updateScoreText();
        updateEmoticon();
        myStartForm.reset();
        myStartDialog.close();
    }
    function openStartDialog(){
        myStartDialog.showModal();
    }
    function highlightWiningLines(x1,y1,x2,y2,x3,y3){
        myTileButtons[x1][y1].classList.add("highlight-winner");
        myTileButtons[x2][y2].classList.add("highlight-winner");
        myTileButtons[x3][y3].classList.add("highlight-winner");

        console.log("Highlighted");
    }
    openStartDialog();
    resetBoard();

    return {resetBoard, updateTile, updateTurnText, updateScoreText, highlightWiningLines};
})();

let player1 = "";
let player2 = "";
