import shipFactory from './shipFactory';

const boardFactory = () => {
  const board = [];
  const ships = [];
  for (let i = 0; i < 100; i += 1) {
    board.push(null);
  }
  const placeShips = (length, coord, dir) => {
    ships.push(shipFactory(length, 0, false));
    if (dir === 'horizontal') {
      for (let i = coord; i < length + coord; i += 1) {
        board[i] = 'S';
        ships[ships.length - 1].coord.push(i);
      }
    } else {
      for (let i = coord; i < length * 10 + coord; i += 10) {
        board[i] = 'S';
        ships[ships.length - 1].coord.push(i);
      }
    }
  };

  const atkMiss = (coord) => {
    if (board[coord] !== 'S') {
      board[coord] = 'M';
    }
  };

  const receiveAttack = (coord) => {
    if (board[coord] === 'S') {
      board[coord] = 'H';
      for (let i = 0; i < ships.length; i += 1) {
        for (let j = 0; j < ships[i].coord.length; j += 1) {
          if (ships[i].coord[j] === coord) {
            ships[i] = ships[i].hit();
          }
        }
      }
    } else {
      atkMiss(coord);
    }
  };

  const allSunk = () => {
    let sunkShips = 0;
    if (ships.length === 0) return false;
    for (let i = 0; i < ships.length; i += 1) {
      if (ships[i].isSunk().sunk) {
        ships[i] = ships[i].isSunk();
        sunkShips += 1;
      }
    }
    if (sunkShips === ships.length) {
      return true;
    }
    return false;
  };

  const boardReset = () => {
    while (board.length > 0) {
      board.pop();
    }
    for (let i = 0; i < 100; i += 1) {
      board.push(null);
    }
    while (ships.length > 0) {
      ships.pop();
    }
  };

  return {
    board, ships, placeShips, receiveAttack, allSunk, atkMiss, boardReset,
  };
};

export default boardFactory;
