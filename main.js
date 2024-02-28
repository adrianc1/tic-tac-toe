function gameboard() {
    let rows = 3;
    let cols = 3;
    let board = [];
    const btn = document.getElementById('submit-btn');
    const form = document.getElementById('form');

    for (let i = 0; i < rows*cols; i++) {
        board.push('');
    };

    btn.addEventListener('click', (e) => {  
        e.preventDefault();
        const pimpValue = document.getElementById('pimp').value;
        const hoeValue = document.getElementById('hoe').value;
        const playerUno = createPlayer(pimpValue, 'X');
        const playerDos = createPlayer(hoeValue, 'O');
        form.style.display = 'none';
        gamePlay(board, playerUno, playerDos);
    });   
}

function updateNameDisplay(display, player) {
    return display.textContent = `it is ${player.name}'s turn!`
};

/* Game play function */
function gamePlay(board, currPlayer, player2) {
    
    /* set up variables for the function  */
    let currentPlayer = currPlayer;
    const cells = document.querySelectorAll('.cell');
    const nameDisplay = document.getElementById('player-turn');
    

    /* display current players turn on the board */
    updateNameDisplay(nameDisplay, currentPlayer);

    /* loop through each cell when clicked add event listener */
    cells.forEach((cell) => {
        cell.addEventListener('click', () => {
            

        /* pull data-index number from html  */
        const index = parseInt(cell.dataset.index);


        /* condition check for empty/blank cell */
        if(cell.textContent !== '') {
            isThereAWinner(board)
            alert('cell is taken!')

        } else {
            console.log(currentPlayer.name === currPlayer.name)
            /* If selected cell is blank run: */
            if(currentPlayer.name === currPlayer.name) {

                /* update cell with current player marker */
                cell.textContent = currentPlayer.marker;
                board[index] = currentPlayer.marker;
                
                /* run isthereawinner function to check if winner */
                isThereAWinner(board)

                /* if no winner, update current player and text */
                currentPlayer = player2;
                updateNameDisplay(nameDisplay, currentPlayer);

            }  else {

                cell.textContent = currentPlayer.marker;
                board[index] = currentPlayer.marker;

                isThereAWinner(board)

                currentPlayer = currPlayer;
                updateNameDisplay(nameDisplay, currentPlayer);
            }
        };
        });
    })
}

function isThereAWinner(board) {
    let roundWon = false;

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
            
            alert('We have a winner!')
        }
    }
};
/* create a player constructor */
function createPlayer (name, marker) {
    return {name, marker}
};


let gameBoard = gameboard()
