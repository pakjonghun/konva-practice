import { Connection, ConnectionBinding } from './../connection/type';
import { NodeItemStore } from './nodeItemStore';
import { PinStore } from './pinStore';
import { NodeBinding, NodeData } from './type';
import { makeAutoObservable, observable, runInAction } from 'mobx';
import { connectId } from './utils';

class NodeStore {
  nodeById = observable.map<string, NodeBinding>();
  connectionById = observable.map<string, ConnectionBinding>();
  pinStore: PinStore;
  nodeItemStore: NodeItemStore;

  constructor() {
    makeAutoObservable(this);
    this.pinStore = new PinStore(this.nodeById);
    this.nodeItemStore = new NodeItemStore(this.nodeById);
  }

  inputConnectionByNodeId = (nodeId: string) => {
    const node = this.nodeItemStore.getTargetNodeData(nodeId);
    return node.nodeData.components.filter((p) => p.placement === 'Input');
  };

  getTargetPinData = (pinId: string) => {
    return this.pinStore.getTargetPinData(pinId);
  };

  tryConnect = (fromPinId: string, toPinId: string) => {
    this.pinStore.tryConnect(fromPinId, toPinId);
  };

  getTargetNodeData = (nodeId: string) => {
    return this.nodeItemStore.getTargetNodeData(nodeId);
  };

  clearNode = () => {
    this.nodeById.clear();
  };

  clearConnection = () => {
    this.connectionById.clear();
  };

  initConnection = (connections: Array<Connection>) => {
    runInAction(() => {
      this.clearConnection();
      for (const connection of connections) {
        this.connectionById.set(connectId(connection), {
          hasView: false,
          connectionData: connection,
        });
      }
    });
  };

  batchBindConnection = (connectionIdList: Array<string>) => {
    runInAction(() => {
      connectionIdList.forEach((id) => {
        const connection = this.connectionById.get(id);
        if (connection) {
          connection.hasView = true;
        }
      });
    });
  };

  get requireConnectionUIList() {
    const notPaintedConnectionList: Connection[] = [];
    this.connectionById.forEach((c) => {
      if (!c.hasView) {
        notPaintedConnectionList.push(c.connectionData);
      }
    });

    return notPaintedConnectionList;
  }

  initNode = (nodeDataList: Array<NodeData>) => {
    runInAction(() => {
      this.clearNode();
      for (const nodeData of nodeDataList) {
        this.nodeById.set(nodeData.id, {
          hasView: false,
          nodeData,
        });
      }
    });
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

export const nodeStore = new NodeStore();
