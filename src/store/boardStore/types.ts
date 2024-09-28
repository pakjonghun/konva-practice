export type TDirection = 'Input' | 'Output';
export type TPinType = 'Parameter' | 'Flow';

export type Position = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type Component = {
  id: string;
  owner: string;
  class: string;
  placement: TDirection;
  children?: Component[];
};

export type INodeData = {
  _id: string;
  type: string;
  name: string;
  initPosition: Position;
  components: Component;
  category: Array<string>;
  explain?: string;
};
