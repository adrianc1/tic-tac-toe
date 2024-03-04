
function gameboard() {
    let rows = 3;
    let cols = 3;
    let board = [];
    const btn = document.getElementById('submit-btn');
    const form = document.getElementById('form');
    const nameDisplay = document.getElementById('player-turn');

    for (let i = 0; i < rows*cols; i++) {
        board.push('');
    };

    btn.addEventListener('click', (e) => {  
        e.preventDefault();
        const pimpValue = document.getElementById('pimp').value;
        const hoeValue = document.getElementById('hoe').value;
        const playerUno = createPlayer(pimpValue, 'X');
        const playerDos = createPlayer(hoeValue, 'O');

        /* condition to make user input name */
        if (playerUno.name === '' || playerDos.name === '') {
            alert('please enter a name for both fields')
            return
        }

        form.style.display = 'none';
        nameDisplay.style.display = 'block';
        gamePlay(board, playerUno, playerDos);
    });   
};



/* update current player on display */

function updateNameDisplay(display, {name}) {
    return display.textContent = `it is ${name}'s turn!`
};


/* Game play function */

function gamePlay(board, currPlayer, player2) {
    let moves = 0;


        /* set up variables for the function  */
        let currentPlayer = currPlayer;
        const cells = document.querySelectorAll('.cell');
        const nameDisplay = document.getElementById('player-turn');

        console.log(moves)
            
        console.log(isThereAWinner(board,currentPlayer))
        
        /* display current players turn on the board */
        updateNameDisplay(nameDisplay, currentPlayer);

        /* loop through each cell when clicked add event listener */
        cells.forEach((cell) => {
            cell.addEventListener('click', () => {
            ++moves;



            /* pull data-index number from html  */
            const index = parseInt(cell.dataset.index);

            /* condition check for empty/blank cell */
            if(cell.textContent !== '') {
                isThereAWinner(board, currentPlayer)
                alert('cell is taken!')

            } else {

                /* If selected cell is blank run: */
                if(currentPlayer.name === currPlayer.name) {

                    /* update cell with current player marker */
                    cell.textContent = currentPlayer.marker;
                    board[index] = currentPlayer.marker;
                    
                    /* run isthereawinner function to check if winner */
                    if(isThereAWinner(board, currentPlayer)){
                        resetGame.restart(currentPlayer, nameDisplay)
                    };


                    /* if no winner, update current player and text */
                    currentPlayer = player2;
                    updateNameDisplay(nameDisplay, currentPlayer);

                }  else {

                    cell.textContent = currentPlayer.marker;
                    board[index] = currentPlayer.marker;

                    if(isThereAWinner(board, currentPlayer)){
                        nameDisplay.style.display = 'none'
                        resetGame.restart(currentPlayer, nameDisplay)
                    };

                    currentPlayer = currPlayer;
                    updateNameDisplay(nameDisplay, currentPlayer);
                }
            };
            });
        })  
}




/* function to check if there is a winner */

function isThereAWinner(board, player) {
    console.log(board)
    let roundWon = false;
    const winnerDisplay = document.getElementById('winner');

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

        let winCondition = winningCombos[i];
        let a = board[winCondition[0]]
        let b = board[winCondition[1]]
        let c = board[winCondition[2]]
        

        if( a === '' || b === '' || c === '') {
            continue
        }

        if (a === b && b === c) {
            roundWon = true;
            winnerDisplay.textContent = `${player.name} is the winner!!`
            return roundWon;
        } 
    }
};


/* create a player constructor */

function createPlayer (name, marker) {
    return {name, marker}
};


/* reset game  */

const resetGame = {
    init: function() {
        document.getElementById('reset-game').addEventListener('click', () => {
            window.location.reload();
            console.log('init function worked!')
        })
    },

    restart: function(player,display) {
        display.style.display = 'none'
    }
};

resetGame.init();