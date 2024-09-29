import { State } from './nodeStore';
import { NodeData, PinConnection } from './types';

export const setNode = (set: any) => (nodeData: NodeData) =>
  set((state: State) => {
    const newMap = new Map(state.nodeById);
    newMap.set(nodeData._id, nodeData);
    state.nodeById = newMap;
  });

export const setNodeList = (set: any) => (nodeList: NodeData[]) =>
  set((state: State) => {
    const newMap = new Map(state.nodeById);
    nodeList.forEach((node) => {
      newMap.set(node._id, node);
    });

    state.nodeById = newMap;
  });

export const setConnection = (set: any) => (connection: PinConnection) =>
  set((state: State) => {
    const newMap = new Map(state.connectionById);
    newMap.set(`${connection.from}-${connection.to}`, connection);
    state.connectionById = newMap;
  });

export const setConnectionList = (set: any) => (connectionList: PinConnection[]) =>
  set((state: State) => {
    const newMap = new Map(state.connectionById);
    connectionList.forEach((connection) => {
      const key = `${connection.from}-${connection.to}`;
      newMap.set(key, connection);
    });
    state.connectionById = newMap;
  });
