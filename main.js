/* Render Gameboard and Markers module */
const Gameboard = (function() {
    let gameboard = ['', '', '','', '', '','', '', ''];

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
    

    const update = (player, index) => {
        gameboard[index] = player.marker;
        render(); 
    };


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
    
    const start = () => {
        players = 
        [createPlayer(document.getElementById('player-one').value, 'X'), 
        createPlayer(document.getElementById('player-two').value, 'O')
    ];
        Gameboard.render();
    }

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

/* Check for time games */
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
        const [a, b, c] = winningCombos[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            document.getElementById('winner').textContent = `${player.name} is the winner!`
            return true;
        } else if (board.every(checkForTie) && gameOver === false) {
            document.getElementById('winner').textContent = "Tie Game!"
            return true;
        }
    }
    return false;
};


/* reset game function */
function resetGame  () {
    window.location.reload()

}

/* create a player constructor */
function createPlayer (name, marker) {
    return {name, marker}
};

/* start button to start the game! */
const startBtn = document.getElementById('submit-btn');
startBtn.addEventListener('click', Game.start)

const resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click', resetGame)























