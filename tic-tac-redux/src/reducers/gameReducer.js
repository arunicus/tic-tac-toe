import { X, O } from '../symbols/symbols';

export const initialState = {
  board: {
    0: [{row:0, position:0, value:'', color:'green', highlight: false}, {row:0, position:1, value:'', color:'green', highlight: false}, {row:0, position:2, value:'', color:'green', highlight: false}],
    1: [{row:1, position:0, value:'', color:'green', highlight: false}, {row:1, position:1, value:'', color:'green', highlight: false}, {row:1, position:2, value:'', color:'green', highlight: false}],
    2: [{row:2, position:0, value:'', color:'green', highlight: false}, {row:2, position:1, value:'', color:'green', highlight: false}, {row:2, position:2, value:'', color:'green', highlight: false}]
  },
  won: undefined,
  draw: false,
  turn: O
};

export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_SYMBOL':
      const {newState} = action;
      return newState;
    case 'START_AGAIN':
      return initialState;
    default:
      return state;
  }
};
