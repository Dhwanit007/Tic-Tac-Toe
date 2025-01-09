// script.js
const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restart');

let isXTurn = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  const currentClass = isXTurn ? 'X' : 'O';
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === currentClass;
    });
  });
}

function isDraw() {
  return [...cells].every(cell => cell.textContent);
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'X' : 'O';

  cell.textContent = currentClass;
  cell.classList.add('taken');

  if (checkWinner()) {
    statusText.textContent = `Player ${currentClass} Wins!`;
    endGame();
    return;
  }

  if (isDraw()) {
    statusText.textContent = "It's a Draw!";
    endGame();
    return;
  }

  isXTurn = !isXTurn;
  statusText.textContent = `Player ${isXTurn ? 'X' : 'O'}'s Turn`;
}

function endGame() {
  cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function restartGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
    cell.addEventListener('click', handleClick, { once: true });
  });

  isXTurn = true;
  statusText.textContent = "Player X's Turn";
}

cells.forEach(cell => cell.addEventListener('click', handleClick, { once: true }));
restartButton.addEventListener('click', restartGame);
