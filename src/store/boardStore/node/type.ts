export type Direction = 'Input' | 'Output';
export type TPinType = 'Parameter' | 'Flow';

export type Position = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type NodeData = {
  id: string;
  type: string;
  name: string;
  initPosition: Position;
  components: Array<ComponentCommon>;
  category: Array<string>;
  explain?: string;
};

export type ComponentCommon = {
  id: string;
  owner: string;
  class: string;
  placement: Direction;
  children?: ComponentCommon[];
  properties: CommonProp;
};

export type CommonProp = {
  name: string;
  uses: TPinType;
  type: string;
};

export type Component<T extends CommonProp> = ComponentCommon & {
  properties: T;
};

export type PinData = {
  name?: string;
  uses: TPinType;
  type: string;
  canBeNull: boolean;
  schemeFieldId?: string;
};

//뷰를 위한 데이터 구조
export type NodeBinding = { hasView: boolean; nodeData: NodeData };
