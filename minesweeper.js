const GRIDX = 4;
const GRIDY = 8;
const MINE_FREQUENCY = 0.2;

const isOver = () => {
  const unopened = document.querySelectorAll('.unopened');
  if (unopened.length === 0) {
    setTimeout(() => {
      alert("YOU WIN 👏🏿👏👏🏽");
      window.location.reload();
    }, 100);
  }
};

function neighbour(td, offsetX, offsetY) {
  const column = td.cellIndex;
  const row = td.parentElement.rowIndex;
  return document.querySelector(`[data-column="${column + offsetX}"][data-row="${row + offsetY}"]`);
}

function incrementNeighbour(td, offsetX, offsetY) {
  const tdWithDataAttr = neighbour(td, offsetX, offsetY);
  if (tdWithDataAttr && tdWithDataAttr.classList.contains('has-mine')) {
    return 1;
  }

  return 0;
}

const open = (tile) => {
  tile.classList.remove('unopened');
  let mines = 0;

  for (let i = -1; i <= 1; i += 1) {
    for (let j = -1; j <= 1; j += 1) {
      if (i !== 0 || j !== 0) {
        mines += incrementNeighbour(tile, i, j);
      }
    }
  }

  if (mines === 0) {
    tile.classList.add('opened');
  } else {
    tile.classList.add(`mine-neighbour-${mines}`);
  }

  if (mines === 0) {
    for (let i = -1; i <= 1; i += 1) {
      for (let j = -1; j <= 1; j += 1) {
        if (i !== 0 || j !== 0) {
          const n = neighbour(tile, i, j);
          if (n && n.classList.contains('unopened')) {
            open(n);
          }
        }
      }
    }
  }

  return mines;
};


const openOnClick = (e) => {
  const tile = e.currentTarget;
  if (tile.classList.contains('has-mine')) {
    document.querySelectorAll('.has-mine').forEach((cell) => {
      cell.classList.remove('has-mine', 'unopened');
      cell.classList.add('mine');
    });
    setTimeout(() => {
      alert("💥GAME OVER. Try again!😁");
      window.location.reload();
    }, 100);
  } else {
    open(tile);
    isOver();
  }
};

const flagOnClick = (e) => {
  e.preventDefault(); // Do not open context menu
  const tile = e.currentTarget;
  tile.classList.toggle('unopened');
  tile.classList.toggle('flagged');
  isOver();
};

const minesweeper = document.querySelector('#minesweeper');
for (let i = 0; i < GRIDX; i += 1) {
  const row = document.createElement('tr');
  row.dataset.row = i;
  for (let j = 0; j < GRIDY; j += 1) {
    row.insertAdjacentHTML('beforeend', `<td class="unopened" data-column="${j}"></td>`);
  }
  minesweeper.append(row);
}

const allTiles = document.querySelectorAll('td');
allTiles.forEach((td) => {
  td.dataset.column = td.cellIndex;
  td.dataset.row = td.parentElement.rowIndex;

  if (Math.random() <= MINE_FREQUENCY) {
    td.classList.add('has-mine');
  }

  td.addEventListener('click', openOnClick);
  td.addEventListener('contextmenu', flagOnClick);
});
