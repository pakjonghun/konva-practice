import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { subscribeWithSelector } from 'zustand/middleware';
import { Position } from './types';

type Action = {
  setPosition: (position: Position) => void;
  setTitle: (title: string) => void;
  setCount: (count: number) => void;
  increaseRenderCount: () => void;
};
type State = Position & { title: string; count: number; renderCount: number };
type StoreType = Action & State;

export const initState: State = {
  title: '',
  count: 1,
  x: -3000,
  y: -2000,
  renderCount: 0,
};

const storeApi: StateCreator<StoreType, [['zustand/immer', never], ['zustand/devtools', never]]> = (
  set
) => ({
  ...initState,
  setTitle: (keyword) =>
    set((state) => {
      state.title = keyword;
    }),
  setPosition: ({ x, y }) =>
    set((state) => {
      state.x = x;
      state.y = y;
    }),
  setCount: (count) =>
    set((state) => {
      state.count = count;
    }),
  increaseRenderCount: () =>
    set((state) => {
      state.renderCount += 1;
    }),
});

export const useBoardStore = create<StoreType>()(
  devtools(immer(subscribeWithSelector(storeApi)), {
    name: '보드 저장소',
  })
);
