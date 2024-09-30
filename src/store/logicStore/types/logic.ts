import { NodeData, PinConnection } from './node';

export type RawLogicBoard = {
  id: string;
  boardData: RawBoardData;
};

export type RawBoardData = {
  nodes: NodeData[];
  pinConnection: PinConnection[];
};

export type BoardData = {
  nodes: NodeDataBinding[];
  pinConnections: ConnectionBinding[];
};

export type NodeDataBinding = {
  hasView: boolean;
  nodeData: NodeData;
};

export type ConnectionBinding = {
  hasView: boolean;
  connectionData: PinConnection;
};
