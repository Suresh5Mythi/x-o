import React from "react";
import GamePanel from "./GamePanel";

function checkForWinner(panelElements) {
  const winningConstraints = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningConstraints.length; i++) {
    const [a, b, c] = winningConstraints[i];
    if (
      panelElements[a] &&
      panelElements[a] === panelElements[b] &&
      panelElements[a] === panelElements[c]
    ) {
      return panelElements[a];
    }
  }

  return null;
}

class XO extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [
        {
          panelElements: Array(9).fill(null),
        },
      ],
      xIsNext: true,
      stepNumber: 0,
    };
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 ? false : true,
    });
  }
  newGame() {
    this.setState({
      history: [
        {
          panelElements: Array(9).fill(null),
        },
      ],
      xIsNext: true,
      stepNumber: 0,
    });
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const panelElements = current.panelElements.slice();
    if (checkForWinner(panelElements) || panelElements[i]) {
      return;
    }
    panelElements[i] = this.state.xIsNext ? "X" : "O";

    this.setState({
      history: history.concat([
        {
          panelElements: panelElements,
        },
      ]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = checkForWinner(current.panelElements);
    let status;
    if (winner || this.state.stepNumber === 9) {
      if (!winner && this.state.stepNumber === 9) {
        status = "Game Tied"
      } else {
        status = "Winner: " + winner;
      }
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    const moves = history.map((step, move) => {
      const desc = move ? "Move #" + move : "New Game";

      if (move) {
        return (
          <li key={move}>
            <a href="#" onClick={() => this.jumpTo(move)}>
              {desc}
            </a>
          </li>
        );
      }
    });

    return (
      <div className="xo">
        <div className="xo-board">
          <GamePanel
            panelElements={current.panelElements}
            onClick={(i) => this.handleClick(i)}
          />
        </div>

        <div className="xo-info">
          <div>{status}</div>
          {moves.length === 1 ||
            status ==="Game Tied"  && (
              
              <a href="#" onClick={() => this.newGame()}>
                New Game
              </a>
            )}
          {moves.length > 1 && <ol>{moves}</ol>}
        </div>
      </div>
    );
  }
}
export default XO;
