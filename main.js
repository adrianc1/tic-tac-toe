/* Render Gameboard and Markers module */
const Gameboard = (function() {
    let gameboard = ['', '', '','', '', '','', '', ''];

    /* render the gameboard on the screen */
    const render = () => {
    let boardHTML  = "";
    gameboard.forEach((cell, index) => {
        boardHTML += `<div class="cell" id="cell-${index}">${cell}</div>`    
    });

    document.getElementById('form').style.display = 'none';
    document.getElementById('board').innerHTML = boardHTML;

    const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.addEventListener('click', Game.handleClick)
        }) 
    };
    
/* update gameboard with current player marker */
    const update = (player, index) => {
        gameboard[index] = player.marker;
        render(); 
    };

/* get a copy of the gameboard to read */
    const getGameboard = gameboard;

    return {
        render,
        update,
        getGameboard,
    }
})();

/* game controller module */
const Game = (function() {
    let players = [];
    let currentPlayerIndex = 0;
    
    /* start game play */
    const start = () => {
        players = 
        [createPlayer(document.getElementById('player-one').value, 'X'), 
        createPlayer(document.getElementById('player-two').value, 'O')
    ];
        Gameboard.render();
    }

    /* function to handle click events */
    const handleClick = (event) => {
        let index = parseInt(event.target.id.split('-')[1]);
        /* check if gameboard cell is empty */
        if(Gameboard.getGameboard[index] !== '') return

        /* update square with current player mark */
        Gameboard.update(players[currentPlayerIndex], index);

        /* check for a winner */
        if(checkForWin( Gameboard.getGameboard, players[currentPlayerIndex])) {
            console.log('gameover sucka')
        }
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0; 
        document.getElementById('player-turn').textContent = `it is ${players[currentPlayerIndex].name} turn`
    }


    return {
        start,
        handleClick, 
    }
})();

/* Check for time games function */
function checkForTie(cell) {
    return cell !== "";
}

/* check for the winner */
function checkForWin(board, player ) {
    let gameOver = false;
    const winningCombos = [
        [0, 1, 2], // top row
        [3, 4, 5], // middle row
        [6, 7, 8], // bottom row
        [0, 3, 6], // left column
        [1, 4, 7], // middle column
        [2, 5, 8], // right column
        [0, 4, 8], // diagonal from top-left to bottom-right
        [2, 4, 6]  // diagonal from top-right to bottom-left
    ];

    for (let i = 0; i < winningCombos.length; i++) {
        const winningArray = [a, b, c] = winningCombos[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            
            winningArray.forEach((index) => {
                const cells = document.querySelectorAll('.cell');
                cells[index].style.backgroundColor = "#DAA21B"
            })

            document.getElementById('winner').textContent = `${player.name} is the winner!`
            return true;
            } else if (board.every(checkForTie) && gameOver === false) {
                document.getElementById('winner').textContent = "Tie Game!"
                return true;
            } 
        }
        return false;
    }
    


/* reset game function */
function resetGame  () {
    window.location.reload()

}

/* create a player constructor */
function createPlayer (name, marker) {
    return {name, marker}
};

/* reset button to reset gameboard */
const resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click', resetGame);

/* start button to start the game! */
const startBtn = document.getElementById('submit-btn');
startBtn.addEventListener('click', Game.start);

























