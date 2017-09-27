import { X, O } from '../symbols/symbols';
import * as _ from 'lodash';

const countInRow = (symbol, row) => row.filter(el => el.value === symbol).length;
const hasWonInRow = (symbol, row) => countInRow(symbol, row) === 3;
export const hasThreatInRow = (symbol, row) => countInRow(symbol, row) === 2;

const countInColumn = (symbol, colNumber, ...rows) => rows.map(row => row[colNumber]).filter(el => el.value === symbol).length;
const hasWonInColumn = (symbol, colNumber, ...rows) => countInColumn(symbol, colNumber, ...rows) === 3;
export const hasThreatInColumn = (symbol, colNumber, ...rows) => countInColumn(symbol, colNumber, ...rows) === 2;

const countInLeftSlant = (symbol, ...rows) => {
  const [row0, row1, row2] = rows;
  return [row0[0], row1[1], row2[2]].filter(el => el.value === symbol).length;
};
const hasWonInLeftSlant = (symbol, ...rows) => countInLeftSlant(symbol, ...rows) === 3;
export const hasThreatInLeftSlant = (symbol, ...rows) => countInLeftSlant(symbol, ...rows) === 2;

const countInRightSlant = (symbol, ...rows) => {
  const [row0, row1, row2] = rows;
  return [row0[2], row1[1], row2[0]].filter(el => el.value === symbol).length;
};
const hasWonInRightSlant = (symbol, ...rows) => countInRightSlant(symbol, ...rows) === 3;
export const hasThreatInRightSlant = (symbol, ...rows) => countInRightSlant(symbol, ...rows) === 2;

export const resultForSymbol = (symbol, board) => {
  const rows = Object.keys(board).map(row => board[row]);
  return [
    { winMatrix: { rows: [0, 0, 0], columns: [0, 1, 2] }, won: hasWonInRow(symbol, board[0]) },
    { winMatrix: { rows: [1, 1, 1], columns: [0, 1, 2] }, won: hasWonInRow(symbol, board[1]) },
    { winMatrix: { rows: [2, 2, 3], columns: [0, 1, 2] }, won: hasWonInRow(symbol, board[2]) },
    { winMatrix: { rows: [0, 1, 2], columns: [0, 0, 0] }, won: hasWonInColumn(symbol, 0, ...rows) },
    { winMatrix: { rows: [0, 1, 2], columns: [1, 1, 1] }, won: hasWonInColumn(symbol, 1, ...rows) },
    { winMatrix: { rows: [0, 1, 2], columns: [2, 2, 2] }, won: hasWonInColumn(symbol, 2, ...rows) },
    { winMatrix: { rows: [0, 1, 2], columns: [0, 1, 2] }, won: hasWonInLeftSlant(symbol, ...rows) },
    { winMatrix: { rows: [2, 1, 0], columns: [0, 1, 2] }, won: hasWonInRightSlant(symbol, ...rows) }
  ]
    .reduce((answer, nextCheck) => {
      return nextCheck.won ? nextCheck : answer;
    }, { won: false });
};

export const playMove = (boardState, row, position, symbol) => {
  const newBoard = _.cloneDeep(boardState);
  const newState = { board: newBoard }
  newState.board[row][position].value = symbol;

  const xResult = resultForSymbol(X, newState.board);
  const oResult = resultForSymbol(O, newState.board);

  if (xResult.won) {
    newState.won = X;
    let rows = xResult.winMatrix.rows
    let columns = xResult.winMatrix.columns
    for (var index = 0; index < rows.length; index++) {
      newState.board[rows[index]][columns[index]].color = 'yellow'
    }
  }

  if (oResult.won) {
    newState.won = O;
    let rows = oResult.winMatrix.rows
    let columns = oResult.winMatrix.columns
    for (var index = 0; index < rows.length; index++) {
      newState.board[rows[index]][columns[index]].color = 'yellow'
    }
  }

  if (!newState.won) {
    newState.turn = symbol === O ? X : O;
  }

  const boardIsFull = [
    ...newState.board[0],
    ...newState.board[1],
    ...newState.board[2]
  ]
    .filter(symbol => symbol.value !== '')
    .length === 9;

  if (boardIsFull && !newState.won) {
    newState.draw = true;
  }
  return newState;
}
