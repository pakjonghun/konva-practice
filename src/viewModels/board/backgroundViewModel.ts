import { BaseViewModel } from '../base/baseViewModel';
import { BackgroundLayer } from '../../views/board/backgroundLayer';
import { Position, Size } from '../../store/nodeStore/types';
import Konva from 'konva';
import { SELECT_RECT } from '../../constants/canvas';

export class BackgroundViewModel extends BaseViewModel {
  private layer: BackgroundLayer;
  panning = false;
  prevPos: Position | null = null;
  dispose: () => void;
  private mousedown = false;

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
    stage.on('mousedown', () => {
      this.mousedown = true;
    });

    stage.on('mouseup', () => {
      this.mousedown = false;
    });

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
      const selectRect = stage.findOne(`#${SELECT_RECT}`);
      const visible = selectRect?.isVisible();
      if (visible) return;

      if (e.code === 'Space' && !this.mousedown) {
        const selectRect = stage.findOne(`#${SELECT_RECT}`);
        selectRect?.visible(false);
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
      stage.off('mousedown');
      stage.off('mouseup');
      stage.off('dragstart');
      stage.off('dragend');
      stage.off('dragmove');
      container.removeEventListener('keyup', keyUpHandler);
      container.removeEventListener('keydown', keyDownHandler);
    };
  }
}
