import { NodeData, PinConnection } from './node';

export type BoardData = { nodes: NodeData[]; pinConnections: PinConnection[] };

export type LogicBoard = {
  id: string;
  data: BoardData;
};
