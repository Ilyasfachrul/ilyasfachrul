const board = document.querySelector('.board');
const statusText = document.querySelector('.status');
let currentPlayer = 'X';
let gameActive = true;
const cells = Array(9).fill(null);

function createBoard() {
  board.innerHTML = '';
  cells.forEach((_, i) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => handleClick(i, cell));
    board.appendChild(cell);
  });
}

function handleClick(i, cell) {
  if (cells[i] || !gameActive) return;
  cells[i] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');
  if (checkWin()) {
    statusText.textContent = `Pemain ${currentPlayer} Menang! 🎉`;
    gameActive = false;
    return;
  }
  if (!cells.includes(null)) {
    statusText.textContent = 'Seri! 😅';
    gameActive = false;
    return;
  }
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Giliran: ${currentPlayer}`;
}

function checkWin() {
  const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winCombos.some(combo => 
    combo.every(index => cells[index] === currentPlayer)
  );
}

function resetGame() {
  currentPlayer = 'X';
  gameActive = true;
  for (let i = 0; i < cells.length; i++) cells[i] = null;
  statusText.textContent = `Giliran: ${currentPlayer}`;
  createBoard();
}

createBoard();
