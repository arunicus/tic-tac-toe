import { createStore } from 'redux';
import {gameReducer,initialState,addSymbol, startAgain } from 'tic-tac-redux';

const store = createStore(gameReducer, initialState)


function component(state) {

  for (var index = 0; index < 3; index++) {
    for (var inner = 0; inner < 3; inner++) {
      document.getElementById('' + inner + index).innerHTML = state.board[inner][index].value
      document.getElementById('' + inner + index).style.backgroundColor = state.board[inner][index].color
    }
  }
  document.getElementById('turn').innerHTML = 'Turn : ' + state.turn
  if (state.won) {
    setTimeout(() => {
      alert('YO ' + state.won + ' you win !!!! Restarting the game')
      store.dispatch(startAgain())
    })
  }

  if (state.draw) {
    setTimeout(() => {
      alert('It is a draw Restarting the game');
      store.dispatch(startAgain())
    })
  }
}

function drawWonLine(winMatrix) {
  let rows = winMatrix.rows
  let columns = winMatrix.columns
  for (var index = 0; index < rows.length; index++) {
    document.getElementById('' + rows[index] + columns[index]).style.backgroundColor = 'yellow'
  }
}

function handleChange() {
  component(store.getState());
}
let unsubscribe = store.subscribe(handleChange)


window.clickButton = function (event) {
  let id = event.currentTarget.id;
  if (event.currentTarget.innerHTML) {
    return
  }
  let row = parseInt(id.substring(0, 1));
  let position = parseInt(id.substring(1, 2))
  store.dispatch(addSymbol(store.getState().board, row, position, store.getState().turn))
}

component(store.getState());