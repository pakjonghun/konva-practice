import { Direction, Position } from './common';

export type Component = {
  id: string;
  owner: string;
  class: string;
  placement: Direction;
  children?: Component[];
};

export type NodeData = {
  _id: string;
  type: string;
  name: string;
  initPosition: Position;
  components: Component;
  category: Array<string>;
  explain?: string;
};

export type PinConnection = {
  from: string;
  to: string;
};
