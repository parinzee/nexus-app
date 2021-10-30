const randomInt = (min, max) => {
  return Math.floor(Math.random() * max + min);
};
// play random
export const robotPlayEasy = (board) => {
  let row = -1;
  let col = -1;
  let found = false;
  // Try a random position
  for (let i = 0; i < 10; i++) {
    let r = randomInt(0, 2);
    let c = randomInt(0, 2);
    if (board[r][c] === 0) {
      row = r;
      col = c;
      found = true;
      break;
    }
  }

  // If could not find a valid random position get the first valid position from the table
  if (!found) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 0) {
          row = i;
          col = j;
          found = true;
          break;
        }
      }
      if (found === true) {
        break;
      }
    }
  }
  return [row, col];
};

// trying to win the game or stop the other player to win
// if there is no way pick a random choose
export const robotPlayHard = (board) => {
  let row = -1;
  let column = -1;
  let found = false;
  // search in rows
  for (let i = 0; i < board.length; i++) {
    const hasEmpty = board[i].includes(0);
    const countOfX = board[i].filter((block) => block === "x").length;
    const countOfO = board[i].filter((block) => block === "o").length;
    if (hasEmpty) {
      if (countOfO === 2) {
        row = i;
        column = board[i].indexOf(0);
        found = true;
        break;
      } else if (countOfX === 2) {
        row = i;
        column = board[i].indexOf(0);
        found = true;
        break;
      }
    }
  }
  // search in column
  const columns = [[], [], []];
  for (let i = 0; i < board.length; i++) {
    columns[i].push(board[0][i]);
    columns[i].push(board[1][i]);
    columns[i].push(board[2][i]);
  }
  for (let i = 0; i < columns.length; i++) {
    const hasEmpty = columns[i].includes(0);
    const countOfX = columns[i].filter((block) => block === "x").length;
    const countOfO = columns[i].filter((block) => block === "o").length;
    if (hasEmpty) {
      if (countOfO === 2) {
        row = columns[i].indexOf(0);
        column = i;
        found = true;
        break;
      } else if (countOfX === 2) {
        row = columns[i].indexOf(0);
        column = i;
        found = true;
        break;
      }
    }
  }
  // search in Diagonals
  const diagonals = [[], []];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (i === j) {
        diagonals[0].push({
          element: board[i][j],
          row: i,
          col: j,
        });
        if (i === 1 && j === 1) {
          diagonals[1].push({
            element: board[i][j],
            row: i,
            col: j,
          });
        }
      }
      if ((i === 0 && j === 2) || (j === 0 && i === 2)) {
        diagonals[1].push({
          element: board[i][j],
          row: i,
          col: j,
        });
      }
    }
  }
  for (let i = 0; i < diagonals.length; i++) {
    const hasEmpty =
      diagonals[i].filter((block) => block.element === 0).length !== 0;
    const countOfX = diagonals[i].filter(
      (block) => block.element === "x"
    ).length;
    const countOfO = diagonals[i].filter(
      (block) => block.element === "o"
    ).length;
    if (hasEmpty) {
      if (countOfO === 2) {
        const block = diagonals[i].find((block) => block.element === 0);
        row = block.row;
        column = block.col;
        found = true;
        break;
      } else if (countOfX === 2) {
        const block = diagonals[i].find((block) => block.element === 0);
        row = block.row;
        column = block.col;
        found = true;
        break;
      }
    }
  }

  if (found) {
    return [row, column];
  } else {
    return robotPlayEasy(board);
  }
};

/**
 * min max algorithm
 * **/
let HUMAN = -1;
let ROBOT = +1;

/* This function tests if a specific player wins */
const gameOver = (state, player) => {
  const win_state = [
    [state[0][0], state[0][1], state[0][2]],
    [state[1][0], state[1][1], state[1][2]],
    [state[2][0], state[2][1], state[2][2]],
    [state[0][0], state[1][0], state[2][0]],
    [state[0][1], state[1][1], state[2][1]],
    [state[0][2], state[1][2], state[2][2]],
    [state[0][0], state[1][1], state[2][2]],
    [state[2][0], state[1][1], state[0][2]],
  ];

  for (let i = 0; i < 8; i++) {
    let line = win_state[i];
    let filled = 0;
    for (let j = 0; j < 3; j++) {
      if (line[j] === player) filled++;
    }
    if (filled === 3) return true;
  }
  return false;
};

/* This function test if the human or computer wins */
const gameOverAll = (state) => {
  return gameOver(state, HUMAN) || gameOver(state, ROBOT);
};

//heuristic evaluation of state
const evaluate = (state) => {
  let score;
  if (gameOver(state, ROBOT)) {
    score = +1;
  } else if (gameOver(state, HUMAN)) {
    score = -1;
  } else {
    score = 0;
  }

  return score;
};

const emptyCells = (state) => {
  const cells = [];
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      if (state[x][y] === 0) cells.push([x, y]);
    }
  }

  return cells;
};

const minmax = (state, depth, player) => {
  let best;

  if (player === ROBOT) {
    best = [-1, -1, -1000];
  } else {
    best = [-1, -1, +1000];
  }
  if (depth === 0 || gameOverAll(state)) {
    let score = evaluate(state);
    return [-1, -1, score];
  }

  emptyCells(state).forEach((cell) => {
    let x = cell[0];
    let y = cell[1];
    state[x][y] = player;
    let score = minmax(state, depth - 1, -player);
    state[x][y] = 0;
    score[0] = x;
    score[1] = y;

    if (player === ROBOT) {
      if (score[2] > best[2]) best = score;
    } else {
      if (score[2] < best[2]) best = score;
    }
  });

  return best;
};

export const robotPlayImpossible = (board) => {
  const newBoard = JSON.parse(JSON.stringify(board));
  for (let i = 0; i < newBoard.length; i++) {
    for (let j = 0; j < newBoard[i].length; j++) {
      if (newBoard[i][j] === 1) {
        newBoard[i][j] = HUMAN;
      } else if (newBoard[i][j] === -1) {
        newBoard[i][j] = ROBOT;
      }
    }
  }
  let move;
  move = minmax(newBoard, emptyCells(newBoard).length, ROBOT);
  if (move[0] === -1 || move[1] === -1) {
    return robotPlayEasy(board);
  }
  return move;
};
