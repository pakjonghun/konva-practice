import { BaseLayer } from '../../views/base/BaseLayer';
import { NodeViewModel } from '../nodeViewModel';
import { BaseStage } from '../../views/base/BaseStage';
import { BaseViewModel } from '../base/baseViewModel';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';
import { usePositionStore } from '../../store/nodeStore/positionStore';
import { BackgroundViewModel } from './backgroundViewModel';
import { Size } from '../../store/nodeStore/types';

export class CanvasViewModel extends BaseViewModel {
  protected layer: Layer;
  private stage: Stage;
  private backgroundViewModel: BackgroundViewModel;

  constructor({ container, width, height }: Size & { container: HTMLDivElement }) {
    super();
    const stage = new BaseStage({
      container,
      width,
      height,
    });

    const paintLayer = new BaseLayer({
      x: 0,
      y: 0,
      width,
      height,
    });
    const backgroundViewModel = new BackgroundViewModel({ stage, width, height });
    stage.add(backgroundViewModel.backgroundLayer, paintLayer);

    this.stage = stage;
    this.layer = paintLayer;
    this.backgroundViewModel = backgroundViewModel;
  }

  bindingNodeUI = (count: number) => {
    for (let i = 0; i < count; i++) {
      new NodeViewModel(this.layer);
    }
  };

  render() {
    const container = this.stage.container();
    container.tabIndex = 1;
    container.focus();

    const unsubscribe = usePositionStore.subscribe(
      (state) => state.count,
      (count) => {
        this.bindingNodeUI(count);
      },
      { equalityFn: (a, b) => a === b }
    );

    const count = usePositionStore.getState().count;
    this.bindingNodeUI(count);
    this.scheduleBatchDraw();

    return () => {
      unsubscribe();
      this.backgroundViewModel.dispose();
    };
  }
}
