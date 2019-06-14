import React from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

class SpeedTree extends React.Component {
  state = {
    openedNodeIds: [],
    selectedNode: ""
  };

  flattenTree = treeData => {
    const result = [];
    for (let node of this.props.data) {
      this.flattenNode(node, 1, result);
    }
    return result;
  };

  flattenNode = (node, depth, result) => {
    const { id, label, children } = node;
    let collapsed = !this.state.openedNodeIds.includes(id);
    result.push({
      id,
      label,
      hasChildren: children && children.length > 0,
      depth,
      collapsed
    });

    if (!collapsed && children) {
      for (let child of children) {
        this.flattenNode(child, depth + 1, result);
      }
    }
  };

  flattenedData = [];

  onOpen = node => {
    return node.collapsed
      ? this.setState({ openedNodeIds: [...this.state.openedNodeIds, node.id] })
      : this.setState({
          openedNodeIds: this.state.openedNodeIds.filter(id => id !== node.id)
        });
  };

  onSelect = (e, node) => {
    e.stopPropagation();
    this.setState({ selectedNode: node.id });
  };

  Row = ({ index, style }) => {
    const node = this.flattenedData[index];
    const left = node.depth * 20;
    const selected = node.id === this.state.selectedNode;

    return (
      <div
        className={`item-background ${
          node.collapsed ? "tree-item-closed" : "tree-item-open"
        } ${selected ? "selected" : ""}`}
        style={style}
        onClick={() => this.onOpen(node)}
      >
        {node.hasChildren && (
          <div className="item-arrow" style={{ left: `${left - 14}px` }} />
        )}
        <div
          className="tree-item-label"
          onClick={e => this.onSelect(e, node)}
          style={{
            position: "absolute",
            left: `${left}px`,
            width: `calc(100% - ${left}px)`
          }}
        >
          {`${node.label}`}
        </div>
      </div>
    );
  };

  render() {
    this.flattenedData = this.flattenTree(this.props.data);
    return (
      <AutoSizer>
        {({ height, width }) => (
          <List
            className="List"
            height={height}
            itemCount={this.flattenedData.length}
            itemSize={32}
            width={width}
            itemKey={index => this.flattenedData[index].id}
          >
            {this.Row}
          </List>
        )}
      </AutoSizer>
    );
  }
}

export default SpeedTree;
