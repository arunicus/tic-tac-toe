import { connect } from 'react-redux'
import { addSymbol, startAgain } from 'tic-tac-redux'
import Tic from '../components/Tic'

const mapStateToProps = (state) => {
    console.log(state);
    return {
    wonFlag: state.won,
    boardState: state.board,
    turn: state.turn
    }
}

const mapDispatchToProps = {
  addSymbol: addSymbol,
  startAgain: startAgain
}

const TicContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tic)

export default TicContainer