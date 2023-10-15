const container = document.getElementById('container');
const resetButton = document.getElementById('resetButton');

function createGrid(size) {
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const gridSquare = document.createElement('div');
    gridSquare.classList.add('grid-square');
    container.appendChild(gridSquare);
  }
}

function clearGrid() {
  const gridSquares = document.querySelectorAll('.grid-square');
  gridSquares.forEach(square => square.style.backgroundColor = 'white');
}

function getRandomColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor}`;
}

function darkenColor(color) {
  let r = parseInt(color.slice(1, 3), 16);
  let g = parseInt(color.slice(3, 5), 16);
  let b = parseInt(color.slice(5, 7), 16);

  r = Math.max(0, r - Math.round(r * 0.1));
  g = Math.max(0, g - Math.round(g * 0.1));
  b = Math.max(0, b - Math.round(b * 0.1));

  return `rgb(${r},${g},${b})`;
}

function handleSquareHover(e) {
  const square = e.target;

  if (square.dataset.interactions >= 10) return;

  let currentColor = square.style.backgroundColor || 'white';

  // Extra Credit: Randomize color
  if (!square.dataset.randomColor) {
    square.dataset.randomColor = getRandomColor();
  }

  currentColor = square.dataset.randomColor;

  // Extra Credit: Progressive darkening
  square.style.backgroundColor = darkenColor(currentColor);

  square.dataset.interactions = (square.dataset.interactions || 0) + 1;

  if (square.dataset.interactions >= 10) {
    square.style.backgroundColor = 'black';
  }
}

resetButton.addEventListener('click', () => {
  const newSize = prompt('Enter the number of squares per side (max 100):');
  const size = Math.min(Math.max(parseInt(newSize), 1), 100);
  container.innerHTML = '';
  createGrid(size);
});

container.addEventListener('mouseover', handleSquareHover);

createGrid(16); // Initial 16x16 grid
