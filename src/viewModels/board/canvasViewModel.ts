import { BaseLayer } from '../../views/base/baseLayer';
import { NodeViewModel } from '../nodeViewModel';
import { BaseStage } from '../../views/base/baseStage';
import { BaseViewModel } from '../base/baseViewModel';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';
import { usePositionStore } from '../../store/nodeStore/positionStore';
import { BackgroundViewModel } from './backgroundViewModel';
import { Size } from '../../store/nodeStore/types';
import { DRAG, PAINT, ZOOM_MAX_SCALE, ZOOM_MIN_SCALE, ZOOM_SPEED } from '../../constants/canvas';
import { SelectRectViewModel } from './selectRectViewModel';
import Konva from 'konva';

export class CanvasViewModel extends BaseViewModel {
  protected layer: Layer;
  private stage: Stage;
  private dragLayer: Layer;
  private backgroundViewModel: BackgroundViewModel;
  private selectRectViewModel: SelectRectViewModel;

  dispose: () => void;

  constructor({ container, width, height }: Size & { container: HTMLDivElement }) {
    super();
    const stage = new BaseStage({
      container,
      width,
      height,
    });

    this.layer = new BaseLayer({
      id: PAINT,
      x: 0,
      y: 0,
      width,
      height,
    });
    this.backgroundViewModel = new BackgroundViewModel({ stage, width, height });
    this.selectRectViewModel = new SelectRectViewModel(stage);
    this.dragLayer = new Konva.Layer({ id: DRAG });

    this.layer.add(this.selectRectViewModel.selectRect, this.selectRectViewModel.transformer);

    stage.add(this.backgroundViewModel.backgroundLayer, this.layer, this.dragLayer);
    this.backgroundViewModel.backgroundLayer.draw();
    this.stage = stage;

    this.layer.clip({
      x: 0,
      y: 0,
      width,
      height,
    });

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

    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        container.style.cursor = 'zoom-in';
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
      this.dragLayer.scale({ x: newScale, y: newScale });
      this.dragLayer.position(newPos);
      const bg = this.backgroundViewModel.backgroundLayer.backgroundRect;
      bg.fillPatternScale({ x: newScale, y: newScale });

      const stagePos = this.dragLayer.position();
      const clipX = -stagePos.x / newScale;
      const clipY = -stagePos.y / newScale;
      const viewportWidth = this.dragLayer.width() / newScale;
      const viewportHeight = this.dragLayer.height() / newScale;

      this.layer.clip({
        x: clipX,
        y: clipY,
        width: viewportWidth, // 뷰포트의 가로 크기
        height: viewportHeight, // 뷰포트의 세로 크기
      });
      this.stage.draw();
    });

    container.addEventListener('keyup', keyUpHandler);
    container.addEventListener('keydown', keyDownHandler);

    return () => {
      container.removeEventListener('keyup', keyUpHandler);
      container.removeEventListener('keydown', keyDownHandler);
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
      this.selectRectViewModel.dispose();
      dispose();
    };
  }
}
