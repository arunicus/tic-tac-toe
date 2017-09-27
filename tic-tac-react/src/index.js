import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import {gameReducer,initialState} from 'tic-tac-redux';

const store = createStore(gameReducer, initialState)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)