import React, { useState } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useSpring, animated } from "react-spring";

const SpeedTree = ({ data }) => {
  const [openedNodeIds, setOpenedNodeIds] = useState([]);
  const [selectedNode, setSelectedNode] = useState("");

  const flattenOpened = treeData => {
    const result = [];
    for (let node of data) {
      flattenNode(node, 1, result);
    }
    return result;
  };

  const flattenNode = (node, depth, result) => {
    const { id, label, children } = node;
    let collapsed = !openedNodeIds.includes(id);
    result.push({
      id,
      label,
      hasChildren: children && children.length > 0,
      depth,
      collapsed
    });

    if (!collapsed && children) {
      for (let child of children) {
        flattenNode(child, depth + 1, result);
      }
    }
  };

  const flattenedData = flattenOpened(data);

  const onOpen = node =>
    node.collapsed
      ? setOpenedNodeIds([...openedNodeIds, node.id])
      : setOpenedNodeIds(openedNodeIds.filter(id => id !== node.id));

  const onSelect = (e, node) => {
    e.stopPropagation();
    setSelectedNode(node.id);
  };

  const Row = ({ index, style }) => {
    const node = flattenedData[index];
    const left = node.depth * 20;
    const selected = node.id === selectedNode;
    const arrowAnimation = useSpring({
      transform: `rotate(${node.collapsed ? 0 : 90}deg)`
    });
    return (
      <div
        className={`item-background ${
          node.collapsed ? "tree-item-closed" : "tree-item-open"
        } ${selected ? "selected" : ""}`}
        style={style}
        onClick={() => onOpen(node)}
      >
        {node.hasChildren && (
          <animated.div
            className="item-arrow"
            style={{ ...arrowAnimation, left: `${left - 14}px` }}
          />
        )}
        <div
          className="tree-item-label"
          onClick={e => onSelect(e, node)}
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

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          className="List"
          height={height}
          itemCount={flattenedData.length}
          itemSize={32}
          width={width}
          itemKey={index => flattenedData[index].id}
        >
          {Row}
        </List>
      )}
    </AutoSizer>
  );
};

export default SpeedTree;
