import { NodeItemStore } from './nodeItemStore';
// import { nodeStore } from './nodeStore';
import { NodeBinding, NodeData } from './type';
import { makeAutoObservable, observable, runInAction } from 'mobx';

class NodeStore {
  nodeById = observable.map<string, NodeBinding>();

  constructor() {
    makeAutoObservable(this);
  }

  getTargetNodeData = (nodeId: string) => {
    const targetNodeData = this.nodeById.get(nodeId)?.nodeData;
    if (!targetNodeData) {
      throw new Error('해당 노드가 존재하지 않습니다.');
    }
    return targetNodeData;
  };

  clear = () => {
    this.nodeById.clear();
  };

  initNode = (nodeDataList: Array<NodeData>) => {
    this.clear();
    for (const nodeData of nodeDataList) {
      const nodeItemStore = new NodeItemStore(nodeData);
      this.nodeById.set(nodeData.id, { hasView: false, nodeData: nodeItemStore });
    }
  };

  batchBindNode = (nodeIdList: string[]) => {
    runInAction(() => {
      nodeIdList.forEach((nodeId) => {
        const item = this.nodeById.get(nodeId);
        if (item) {
          item.hasView = true;
        }
      });
    });
  };

  get requireNodeUIList() {
    const notPaintedNodeList: NodeData[] = [];
    this.nodeById.forEach((node) => {
      if (!node.hasView) {
        notPaintedNodeList.push(node.nodeData.nodeData);
      }
    });

    return notPaintedNodeList;
  }
}

export const nodeStore = new NodeStore();
