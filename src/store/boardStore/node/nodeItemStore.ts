import { makeAutoObservable } from 'mobx';
import { NodeBinding, Position } from './type';

export class NodeItemStore {
  nodeById: Map<string, NodeBinding>;
  constructor(nodeById: Map<string, NodeBinding>) {
    this.nodeById = nodeById;
    makeAutoObservable(this);
  }

  getTargetNodeData = (nodeId: string) => {
    const targetNodeData = this.nodeById.get(nodeId);
    if (!targetNodeData) {
      throw new Error('해당 노드가 존재하지 않습니다.');
    }
    return targetNodeData;
  };

  title = (nodeId: string) => {
    return this.getTargetNodeData(nodeId).nodeData.name;
  };

  setTitle = (nodeId: string, newTitle: string) => {
    this.getTargetNodeData(nodeId).nodeData.name = newTitle;
  };

  position = (nodeId: string) => {
    return this.getTargetNodeData(nodeId).nodeData.initPosition;
  };

  setPosition = (nodeId: string, position: Position) => {
    this.getTargetNodeData(nodeId).nodeData.initPosition = position;
  };
}
