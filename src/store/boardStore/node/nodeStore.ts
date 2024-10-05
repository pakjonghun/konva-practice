import { NodeBinding, NodeData } from './type';
import { makeAutoObservable, observable, runInAction } from 'mobx';

export class NodeStore {
  nodeById = observable.map<string, NodeBinding>();

  constructor() {
    makeAutoObservable(this);
  }

  initNode = (nodeDataList: Array<NodeData>) => {
    for (const nodeData of nodeDataList) {
      this.nodeById.set(nodeData.id, { hasView: false, nodeData });
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
        notPaintedNodeList.push(node.nodeData);
      }
    });

    return notPaintedNodeList;
  }
}
