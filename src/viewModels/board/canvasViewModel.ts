import { BaseStage } from '../../views/base/baseStage';
import { BaseViewModel } from '../base/baseViewModel';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';
import { BgViewModel } from './bgLayerViewModel';
import { DRAG, ZOOM_MAX_SCALE, ZOOM_MIN_SCALE, ZOOM_SPEED } from '../../constants/canvas';
import { SelectRectViewModel } from './selectRectViewModel';
import Konva from 'konva';
import { PaintLayerViewModel } from './paintLayerViewModel';
import { Size } from '../../store/logicStore/types/common';

export class CanvasViewModel extends BaseViewModel {
  private stage: Stage;
  private dragLayer: Layer;
  private bgLayerViewModel: BgViewModel;
  private paintLayerViewModel: PaintLayerViewModel;
  private selectRectViewModel: SelectRectViewModel;
  dispose: () => void;

  constructor({ container, width, height }: Size & { container: HTMLDivElement }) {
    super();
    const stage = new BaseStage({
      container,
      width,
      height,
    });

    const dragLayer = (this.dragLayer = new Konva.Layer({ id: DRAG }));
    const bgViewModel = (this.bgLayerViewModel = new BgViewModel({ stage, width, height }));
    const paintViewModel = (this.paintLayerViewModel = new PaintLayerViewModel({
      stage,
      width,
      height,
    }));
    const selectRectViewModel = (this.selectRectViewModel = new SelectRectViewModel(stage));
    paintViewModel.paintLayer.add(selectRectViewModel.selectRect, selectRectViewModel.transformer);
    stage.add(bgViewModel.bgLayer, paintViewModel.paintLayer, dragLayer);
    this.stage = stage;
    this.dispose = this.paint();
  }

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

      const paintLayer = this.paintLayerViewModel.paintLayer;
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
      this.dragLayer.scale({ x: newScale, y: newScale });
      this.dragLayer.position(newPos);
      const bg = this.bgLayerViewModel.bgLayer.backgroundRect;
      bg.fillPatternScale({ x: newScale, y: newScale });

      this.stage.draw();
    });

    container.addEventListener('keyup', keyUpHandler);

    return () => {
      container.removeEventListener('keyup', keyUpHandler);
      this.stage.off('wheel');
    };
  }

  paint() {
    const dispose = this.addEventList();
    this.stage.batchDraw();

    return () => {
      this.paintLayerViewModel.dispose();
      this.bgLayerViewModel.dispose();
      this.selectRectViewModel.dispose();
      dispose();
    };
  }
}
