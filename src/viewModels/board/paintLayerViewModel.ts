import { BaseLayer } from '../../views/base/baseLayer';
import { NodeViewModel } from '../node/nodeViewModel';
import { BaseViewModel } from '../base/baseViewModel';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';
import { PAINT } from '../../constants/canvas';
import { Size } from '../../store/logicStore/types/common';
import { useLogicStore } from '../../store/logicStore/logicStore';

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

    const unsubscribe = useLogicStore.subscribe(
      (state) => state.logicById,
      (logicById) => {
        // this.bindingNodeUI();
      },
      { equalityFn: (a, b) => a === b }
    );

    const logicById = useLogicStore.getState().logicById;
    // this.bindingNodeUI(count);
    this.stage.batchDraw();

    return () => {
      unsubscribe();
    };
  }

  get paintLayer() {
    return this.view;
  }
}
