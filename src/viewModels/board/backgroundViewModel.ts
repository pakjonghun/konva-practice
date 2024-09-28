import { BaseViewModel } from '../base/baseViewModel';
import { BackgroundLayer } from '../../views/static/backgroundLayer';
import { Position, Size } from '../../store/nodeStore/types';
import Konva from 'konva';
import { useBoardStore } from '../../store/boardStore/boardStore';

export class BackgroundViewModel extends BaseViewModel {
  protected layer: BackgroundLayer;
  panning = false;
  prevPos: Position | null = null;
  dispose: () => void;

  constructor({ width, height, stage }: Size & { stage: Konva.Stage }) {
    super();

    this.layer = new BackgroundLayer({
      x: 0,
      y: 0,
      width,
      height,
    });

    this.dispose = this.addEventList(stage);
  }

  get backgroundLayer() {
    return this.layer;
  }

  addEventList(stage: Konva.Stage) {
    stage.on('dragstart', () => {
      this.prevPos = stage.getPointerPosition();
    });

    stage.on('dragend', () => {
      this.prevPos = null;
    });

    stage.on('dragmove', () => {
      if (!this.prevPos) {
        return;
      }

      const { x: px, y: py } = this.prevPos;
      const { x, y } = stage.position();
      if (x === px && y === py) {
        return;
      }

      const bg = this.layer.backgroundRect;
      bg.x(-x);
      bg.y(-y);
      bg.fillPatternOffset({ x: -x, y: -y });

      this.prevPos = { x, y };
    });

    const container = stage.container();
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        container.style.cursor = 'grab';
        stage.draggable(true);
      }
    };

    const keyUpHandler = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        container.style.cursor = 'default';
        stage.draggable(false);
      }
    };

    container.addEventListener('keyup', keyUpHandler);
    container.addEventListener('keydown', keyDownHandler);

    return () => {
      stage.off('dragstart');
      stage.off('dragend');
      stage.off('dragmove');
      container.removeEventListener('keyup', keyUpHandler);
      container.removeEventListener('keydown', keyDownHandler);
    };
  }
}
