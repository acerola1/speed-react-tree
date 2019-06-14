import React from "react";
import { render } from "react-dom";

import "./styles.css";
import SpeedTree from "./component/SpeedTree";
import createData from "./data";

const data = createData();

class Example extends React.Component {
  state = {
    openedNodeIds: [],
    selectedId: ""
  };

  onSelect = id => {
    this.setState({ selectedId: id });
  };

  onOpenChange = (nodeId, opened) => {
    return opened
      ? this.setState({ openedNodeIds: [...this.state.openedNodeIds, nodeId] })
      : this.setState({
          openedNodeIds: this.state.openedNodeIds.filter(id => id !== nodeId)
        });
  };

  render() {
    return (
      <div style={{ height: "100%" }}>
        <SpeedTree
          selectedId={this.state.selectedId}
          onSelect={this.onSelect}
          openedNodeIds={this.state.openedNodeIds}
          onOpenChange={this.onOpenChange}
          data={data}
        />{" "}
      </div>
    );
  }
}

render(<Example />, document.getElementById("root"));
