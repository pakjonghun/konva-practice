import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { subscribeWithSelector } from 'zustand/middleware';
import {
  RawLogicBoard,
  NodeDataBinding,
  ConnectionBinding,
} from './types/logic';

type Action = {
  initBoardData: (rawLogicData: RawLogicBoard) => void;
};
type State = {
  logicId: string;
  nodeById: Map<string, NodeDataBinding>;
  connectionById: Map<string, ConnectionBinding>;
};
type StoreType = Action & State;

export const initState: State = {
  logicId: '',
  nodeById: new Map(),
  connectionById: new Map(),
};

const storeApi: StateCreator<
  StoreType,
  [['zustand/immer', never], ['zustand/devtools', never]]
> = (set) => ({
  ...initState,
  initBoardData: (rawLogicData) =>
    set((state) => {
      const nodeMap = new Map<string, NodeDataBinding>();
      const connectionMap = new Map();

      const nodes = rawLogicData.boardData.nodes;
      nodes.map((nodeData) => {
        nodeMap.set(nodeData._id, { hasView: false, nodeData: nodeData });
      });

      const connections = rawLogicData.boardData.nodes;
      connections.map((connectionData) => {
        nodeMap.set(connectionData._id, {
          hasView: false,
          nodeData: connectionData,
        });
      });

      state.nodeById = nodeMap;
      state.connectionById = connectionMap;
    }),
  bindNode: (nodeId: string) =>
    set((state) => {
      const nodeMap = new Map<string, NodeDataBinding>(state.nodeById);
      const targetNode = nodeMap.get(nodeId);
      if (targetNode) {
        const newNode = {
          hasView: true,
          nodeData: targetNode.nodeData,
        };
        nodeMap.set(nodeId, newNode);
      }
      state.nodeById = nodeMap;
    }),
});

export const useLogicStore = create<StoreType>()(
  devtools(immer(subscribeWithSelector(storeApi)), {
    name: '로직들의 저장소',
  })
);
