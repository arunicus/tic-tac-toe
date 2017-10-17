import React from 'react'

const Tic = ({ wonFlag, boardState, turn, addSymbol,startAgain }) => {
    return (
        <div>
            <h1>Redux with React</h1>
            <Header wonFlag={wonFlag} turn = {turn} startAgain={startAgain}/>
            {Object.keys(boardState).map(row => <Row row={boardState[row]} key={row} rowNum={row} addSymbol={(rowNum, position) => { addSymbol(boardState, rowNum, position, turn) }} />)}
        </div>
    )
}

const Header = ({ wonFlag, turn , startAgain }) => {
    let restartButton = wonFlag ? <button style={{ width: '100px', fontSize: '14px', backgroundColor: '#4CAF50' }} onClick={startAgain}>Restart Game</button> : null
    return (
        <span>
            <h2>{wonFlag ? wonFlag + ' Won the match ' : 'Turn : ' + turn}</h2>
            <p>{restartButton}</p>
        </span>
    )
}

const Row = ({ row, addSymbol, rowNum }) => (
    <div>
        {row.map((item, index) => { return <button style={{ backgroundColor: item.color }} value={item} key={index} onClick={() => { addSymbol(rowNum, index); }} >{item.value}</button> })}
    </div>
)

export default Tic