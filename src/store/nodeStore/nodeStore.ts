import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { subscribeWithSelector } from 'zustand/middleware';
import { NodeData, PinConnection } from './types';
import { setConnection, setConnectionList, setNode, setNodeList } from './initNodeActions';

type Action = {
  setNode: (node: NodeData) => void;
  setNodeList: (node: NodeData[]) => void;
  setConnection: (connection: PinConnection) => void;
  setConnectionList: (connection: PinConnection[]) => void;
};
export type State = { nodeById: Map<string, NodeData>; connectionById: Map<string, PinConnection> };
type StoreType = Action & State;

export const initState: State = {
  nodeById: new Map(),
  connectionById: new Map(),
};

const nodeStoreApi: StateCreator<
  StoreType,
  [['zustand/immer', never], ['zustand/devtools', never]]
> = (set) => ({
  ...initState,
  setNode: setNode(set),
  setNodeList: setNodeList(set),
  setConnection: setConnection(set),
  setConnectionList: setConnectionList(set),
});

export const useNodeStore = create<StoreType>()(
  devtools(immer(subscribeWithSelector(nodeStoreApi)), {
    name: '노드 데이터 저장소',
  })
);
