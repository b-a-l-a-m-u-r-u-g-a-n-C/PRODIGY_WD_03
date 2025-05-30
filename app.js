const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('reset');

let board = Array(9).fill('');
let currentPlayer = 'X';
let isGameActive = true;

const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function handleClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== '' || !isGameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (currentPlayer === 'X') {
  e.target.style.color = 'green';
    } 
    else {
  e.target.style.color = 'red';  
    }

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    isGameActive = false;
    return;
  }
  

  if (!board.includes('')) {
    statusText.textContent = "It's a draw!";
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function resetGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  isGameActive = true;
  statusText.textContent = "Player X's turn";
  cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetBtn.addEventListener('click', resetGame);
