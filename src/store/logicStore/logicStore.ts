import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { subscribeWithSelector } from 'zustand/middleware';
import { BoardData, LogicBoard } from './types/logic';

type Action = {
  setBoardData: (boardData: LogicBoard) => void;
};
type State = {
  logicById: Map<string, BoardData>;
};
type StoreType = Action & State;

export const initState: State = {
  logicById: new Map(),
};

const storeApi: StateCreator<StoreType, [['zustand/immer', never], ['zustand/devtools', never]]> = (
  set
) => ({
  ...initState,
  setBoardData: (logicBoard) =>
    set((stage) => {
      const newMap = new Map(stage.logicById);
      newMap.set(logicBoard.id, logicBoard.data);
    }),
});

export const useLogicStore = create<StoreType>()(
  devtools(immer(subscribeWithSelector(storeApi)), {
    name: '로직들의 저장소',
  })
);
