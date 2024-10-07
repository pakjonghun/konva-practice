import { NodeItemStore } from './nodeItemStore';
import { PinStore } from './pinStore';
import { NodeBinding, NodeData } from './type';
import { action, makeAutoObservable, observable } from 'mobx';

class NodeStore {
  nodeById = observable.map<string, NodeBinding>();
  pinAction: PinStore;
  nodeAction: NodeItemStore;

  constructor() {
    makeAutoObservable(this);
    this.pinAction = new PinStore(this.nodeById);
    this.nodeAction = new NodeItemStore(this.nodeById);
  }

  getTargetPinData = (pinId: string) => {
    return this.pinAction.getTargetPinData(pinId);
  };

  tryConnect = (fromPinId: string, toPinId: string) => {
    this.pinAction.tryConnect(fromPinId, toPinId);
  };

  getTargetNodeData = (nodeId: string) => {
    return this.nodeAction.getTargetNodeData(nodeId);
  };

  clear = () => {
    this.nodeById.clear();
  };

  initNode = (nodeDataList: Array<NodeData>) => {
    this.clear();
    for (const nodeData of nodeDataList) {
      this.nodeById.set(nodeData.id, {
        hasView: false,
        nodeData,
      });
    }
  };

  //반복문으로 상태를 여러번 바꾸므로 1번만 랜더링이 확실히 되도록 @action 처리함(runinaction 도 가능)
  @action
  batchBindNode = (nodeIdList: string[]) => {
    nodeIdList.forEach((nodeId) => {
      const item = this.nodeById.get(nodeId);
      if (item) {
        item.hasView = true;
      }
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

export const nodeStore = new NodeStore();
