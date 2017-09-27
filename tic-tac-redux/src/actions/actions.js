
import { playMove } from '../logic/logic';

export const addSymbol = (boardState, row, position, symbol) => {
  let newState = playMove(boardState, row, position, symbol);
  console.log(newState);
  return {
    type: 'ADD_SYMBOL',
    newState
  }
};

export const startAgain = () => ({
  type: 'START_AGAIN'
});
