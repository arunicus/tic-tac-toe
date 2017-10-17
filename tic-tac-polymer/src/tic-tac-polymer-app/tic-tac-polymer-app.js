import { createStore } from '../../node_modules/redux';
import PolymerRedux from '../../node_modules/Polymer-redux';
import { gameReducer, initialState, addSymbol, startAgain } from '../../node_modules/tic-tac-redux/src/tictacredux.js';
import { Element as PolymerElement } from "../../node_modules/@polymer/polymer/polymer-element.js"
import { DomRepeat } from "../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js";
import { DomIf } from "../../node_modules/@polymer/polymer/lib/elements/dom-if.js";

const store = createStore(gameReducer, initialState)

// Create the PolymerRedux mixin
const ReduxMixin = PolymerRedux(store)

class TicTacPolymerApp extends ReduxMixin(PolymerElement) {
  static get is() { return 'tic-tac-polymer-app'; }
  static get template() {
    return `
      <style>
        :host {
          display: block;
        }
      </style>
      
      <template is="dom-if" if="{{turn}}">
        <h2>Hello player this turn [[turn]]</h2>
      </template>
      <template is="dom-if" if="{{won}}">
        <h2>won the game [[won]] !!!</h2>
        <button on-click="restartButtonClicked">Restart Game</button>
      </template>
      <br>
      <template is="dom-repeat" items=[[getBoardItems(board)]] as="row" index-as="rowInd" >
        <template is="dom-repeat" items=[[row]] as="item" >
          <tic-tac-button item=[[item]] on-click="buttonClicked"></tic-tac-button>
        </template>
        <br>
      </template>      
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'tic-tac-polymer-app'
      },
      turn: {
        type: String,
        statePath: 'turn'
      },
      board: {
        type: Array,
        value: [],
        statePath(state) {
          return state.board;
        }
      },
      won: {
        type: String,
        statePath: 'won'
      },
      boardState: {
        type: Object,
        statePath(state) {
          return state.board;
        }
      }
    };
  }

  getBoardItems(){
    return Object.values(this.board);
  }
  buttonClicked(e) {
    if(this.won){
      return;
    }
    this.dispatch(addSymbol(this.boardState, e.detail.item.row, e.detail.item.position, this.turn))
  }
  restartButtonClicked(e) {
    this.dispatch(startAgain())
  }
}

window.customElements.define(TicTacPolymerApp.is, TicTacPolymerApp);


class TicTacButton extends ReduxMixin(PolymerElement) {
  static get is() { return 'tic-tac-button'; }
  static get template() {
    return `
      <button on-click="buttonClicked" style="width:40px;height:40px;vertical-align:top;background-color:{{item.color}};color:white">[[item.value]]</button>
    `;
  }
  static get properties() {
    return {
      item: {
        type: Object
      },
    };
  }
  buttonClicked(e) {
    e.stopImmediatePropagation();
    this.dispatchEvent(new CustomEvent('click', {
      detail: {
        item: this.item
      }
      , bubbles: true
    }));
  }
}

window.customElements.define(TicTacButton.is, TicTacButton);