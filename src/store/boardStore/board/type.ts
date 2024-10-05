import { Connection } from '../connection/type';
import { NodeData } from '../node/type';
import { Type } from '../type/type';
import { Variable } from '../variable/type';

export type BoardData = {
  variable: Array<Variable>;
  node: Array<NodeData>;
  connection: Array<Connection>;
  localType: Type[];
};

export type BoardSpec = {
  id: string;
  name: string;
  createdAt: string;
};
