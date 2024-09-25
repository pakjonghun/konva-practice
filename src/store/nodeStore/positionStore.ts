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

type PositionStoreType = Action & Position & { title: string; count: number; renderCount: number };

export const initState: Position & { title: string; count: number; renderCount: number } = {
  title: '',
  count: 1,
  x: 0,
  y: 0,
  renderCount: 0,
};

const positionStoreApi: StateCreator<
  PositionStoreType,
  [['zustand/immer', never], ['zustand/devtools', never]]
> = (set) => ({
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

export const usePositionStore = create<PositionStoreType>()(
  devtools(immer(subscribeWithSelector(positionStoreApi)), {
    name: 'our dev tool!!',
  })
);
