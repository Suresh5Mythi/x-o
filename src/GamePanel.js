import React from "react";

import Holder from "./Holder";

class GamePanel extends React.Component {
  renderHolder(i) {
    return (
      <Holder
        value={this.props.panelElements[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  render() {
    return (
      <div>
        <div>
          {this.renderHolder(0)}
          {this.renderHolder(1)}
          {this.renderHolder(2)}
        </div>
        <div>
          {this.renderHolder(3)}
          {this.renderHolder(4)}
          {this.renderHolder(5)}
        </div>
        <div>
          {this.renderHolder(6)}
          {this.renderHolder(7)}
          {this.renderHolder(8)}
        </div>
      </div>
    );
  }
}
export default GamePanel;
