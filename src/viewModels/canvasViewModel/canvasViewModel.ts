import { BaseLayer } from '../../views/base/baseLayer';
import { NodeViewModel } from '../nodeViewModel';
import { BaseStage } from '../../views/base/baseStage';
import { BaseViewModel } from '../base/baseViewModel';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';
import { usePositionStore } from '../../store/nodeStore/positionStore';
import { BackgroundViewModel } from './backgroundViewModel';
import { Size } from '../../store/nodeStore/types';
import { ZOOM_MAX_SCALE, ZOOM_MIN_SCALE, ZOOM_SPEED } from '../../constants/canvas';
import Konva from 'konva';

export class CanvasViewModel extends BaseViewModel {
  protected layer: Layer;
  private stage: Stage;
  private backgroundViewModel: BackgroundViewModel;
  private transformer: Konva.Transformer;

  dispose: () => void;

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
    const tr = new Konva.Transformer();
    this.transformer = tr;
    paintLayer.add(tr);
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
    const container = this.stage.container();
    container.tabIndex = 1;
    container.focus();

    const keyUpHandler = (e: KeyboardEvent) => {
      if (!e.ctrlKey && !e.metaKey) {
        container.style.cursor = 'default';
      }
    };

    this.stage.on('wheel', (event) => {
      event.evt.preventDefault();
      if (!event.evt.ctrlKey && !event.evt.metaKey) return;

      const paintLayer = this.layer;

      const prevScale = paintLayer.scaleX();
      const container = this.stage.container();
      const dy = event.evt.deltaY;
      const isZoomOut = dy > 0;
      let newScale = 0;
      if (isZoomOut) {
        container.style.cursor = 'zoom-out';
        newScale = prevScale / ZOOM_SPEED;
      } else {
        container.style.cursor = 'zoom-in';
        newScale = prevScale * ZOOM_SPEED;
      }

      newScale = Math.max(ZOOM_MIN_SCALE, Math.min(ZOOM_MAX_SCALE, newScale));
      if (newScale === prevScale) {
        return;
      }

      const pointer = this.stage.getPointerPosition()!;
      const pos = paintLayer.position();
      const prevX = (pointer.x - pos.x) / prevScale;
      const prevY = (pointer.y - pos.y) / prevScale;

      const newPos = {
        x: pointer.x - prevX * newScale,
        y: pointer.y - prevY * newScale,
      };

      paintLayer.scale({ x: newScale, y: newScale });
      paintLayer.position(newPos);
      const bg = this.backgroundViewModel.backgroundLayer.backgroundRect;
      bg.fillPatternScale({ x: newScale, y: newScale });
    });

    container.addEventListener('keyup', keyUpHandler);

    return () => {
      container.removeEventListener('keyup', keyUpHandler);
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
    this.stage.batchDraw();

    return () => {
      unsubscribe();
      this.backgroundViewModel.dispose();
      dispose();
    };
  }
}
