import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { subscribeWithSelector } from 'zustand/middleware';

type Action = {
  setZoom: (value: boolean) => void;
};

type State = {
  isZoom: boolean;
};

type StoreType = Action & State;

const initState: State = {
  isZoom: false,
};

const boardStoreApi: StateCreator<
  StoreType,
  [['zustand/immer', never], ['zustand/devtools', never]]
> = (set) => ({
  ...initState,
  setZoom: (isZoom) =>
    set((state) => {
      state.isZoom = isZoom;
    }),
});

export const useBoardStore = create<StoreType>()(
  devtools(immer(subscribeWithSelector(boardStoreApi)), {
    name: 'zoom',
  })
);
