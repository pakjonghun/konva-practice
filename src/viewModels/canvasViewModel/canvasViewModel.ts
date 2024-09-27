import { BaseLayer } from '../../views/base/BaseLayer';
import { NodeViewModel } from '../nodeViewModel';
import { BaseStage } from '../../views/base/BaseStage';
import { BaseViewModel } from '../base/baseViewModel';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';
import { usePositionStore } from '../../store/nodeStore/positionStore';
import { BackgroundViewModel } from './backgroundViewModel';
import { Size } from '../../store/nodeStore/types';
import { ZOOM_MAX_SCALE, ZOOM_MIN_SCALE, ZOOM_SPEED } from '../../constants/canvas';

export class CanvasViewModel extends BaseViewModel {
  width: number;
  height: number;
  protected layer: Layer;
  private stage: Stage;
  private backgroundViewModel: BackgroundViewModel;
  dispose: () => void;

  constructor({ container, width, height }: Size & { container: HTMLDivElement }) {
    super();
    this.width = width;
    this.height = height;
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
    this.dispose = this.render();
  }

  bindingNodeUI = (count: number) => {
    for (let i = 0; i < count; i++) {
      new NodeViewModel(this.layer);
    }
  };

  addEventList() {
    this.stage.on('wheel', (event) => {
      event.evt.preventDefault();

      const prevScale = this.stage.scaleX();

      const dy = event.evt.deltaY;
      let newScale =
        dy > 0 //
          ? prevScale / ZOOM_SPEED
          : prevScale * ZOOM_SPEED;

      newScale = Math.max(ZOOM_MIN_SCALE, Math.min(ZOOM_MAX_SCALE, newScale));
      if (newScale === prevScale) {
        return;
      }

      const pointer = this.stage.getPointerPosition()!;
      const pos = this.stage.position();
      const prevX = (pointer.x - pos.x) / prevScale;
      const prevY = (pointer.y - pos.y) / prevScale;

      const newPos = {
        x: pointer.x - prevX * newScale,
        y: pointer.y - prevY * newScale,
      };

      this.stage.scale({ x: newScale, y: newScale });
      this.stage.position(newPos);
      this.backgroundViewModel.backgroundLayer.size({ width: this.width, height: this.height });
      this.backgroundViewModel.backgroundLayer.backgroundRect.size({
        width: this.width,
        height: this.height,
      });

      this.stage.batchDraw();
    });

    return () => {
      this.stage.off('wheel');
    };
  }

  render() {
    const dispose = this.addEventList();
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
      dispose();
    };
  }
}
