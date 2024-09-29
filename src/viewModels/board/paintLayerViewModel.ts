import { BaseLayer } from '../../views/base/baseLayer';
import { NodeViewModel } from '../node/nodeViewModel';
import { BaseViewModel } from '../base/baseViewModel';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';
import { useBoardStore } from '../../store/boardStore/boardStore';
import { Size } from '../../store/boardStore/types';
import { PAINT } from '../../constants/canvas';

export class PaintLayerViewModel extends BaseViewModel {
  private view: Layer;
  private stage: Stage;
  dispose: () => void;

  constructor({ stage, width, height }: Size & { stage: Stage }) {
    super();
    this.stage = stage;

    this.view = new BaseLayer({
      id: PAINT,
      x: 0,
      y: 0,
      width,
      height,
    });

    this.dispose = this.paint();
  }

  bindingNodeUI = (count: number) => {
    for (let i = 0; i < count; i++) {
      new NodeViewModel(this.view);
    }
  };

  paint() {
    const container = this.stage.container();
    container.tabIndex = 1;
    container.focus();

    const unsubscribe = useBoardStore.subscribe(
      (state) => state.count,
      (count) => {
        this.bindingNodeUI(count);
      },
      { equalityFn: (a, b) => a === b }
    );

    const count = useBoardStore.getState().count;
    this.bindingNodeUI(count);
    this.stage.batchDraw();

    return () => {
      unsubscribe();
    };
  }

  get paintLayer() {
    return this.view;
  }
}
