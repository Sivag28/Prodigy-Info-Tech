const statusMessage = document.getElementById('statusMessage');
const restartButton = document.getElementById('resetButton');
const gameBoard = document.getElementById('gameBoard');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
  [0, 1, 2], 
  [3, 4, 5], 
  [6, 7, 8], 
  [0, 3, 6], 
  [1, 4, 7], 
  [2, 5, 8], 
  [0, 4, 8], 
  [2, 4, 6]  
];

function createBoard() {
  gameBoard.innerHTML = ''; 
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    gameBoard.appendChild(cell);
    cell.addEventListener('click', handleClick);
  }
}

function handleClick(event) {
  const cell = event.target;
  const cellIndex = cell.dataset.index;

  if (boardState[cellIndex] !== '' || checkWin()) return;

  boardState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    statusMessage.textContent = `Player ${currentPlayer} wins!`;
    highlightWinningCells();
    return;
  }

  if (boardState.every(cell => cell !== '')) {
    statusMessage.textContent = "It's a tie!";
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusMessage.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
  });
}

function highlightWinningCells() {
  winningCombinations.forEach(combination => {
    const [a, b, c] = combination;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      document.querySelector(`[data-index='${a}']`).classList.add('winning-cell');
      document.querySelector(`[data-index='${b}']`).classList.add('winning-cell');
      document.querySelector(`[data-index='${c}']`).classList.add('winning-cell');
    }
  });
}

function restartGame() {
  boardState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  statusMessage.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
}

createBoard();
restartButton.addEventListener('click', restartGame);