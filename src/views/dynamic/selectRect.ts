import { SELECT_COLOR, SELECT_STROKE_COLOR } from '../../constants/canvas';
import { useBoardStore } from '../../store/boardStore/boardStore';
import { Position } from '../../store/nodeStore/types';
import { BaseRect } from '../base/baseRect';
import { BaseStage } from '../base/baseStage';

export class SelectRect extends BaseRect {
  private selecting = false;
  private prevPos: null | Position = null;
  dispose: () => void;
  constructor(private stage: BaseStage) {
    super({
      fill: SELECT_COLOR,
      strokeWidth: 1,
      stroke: SELECT_STROKE_COLOR,
      visible: false,
    });

    this.dispose = this.addEventList();
  }

  addEventList() {
    this.stage.on('mousedown', (event) => {
      console.log('d');
      const isDraggable = this.stage.draggable();
      if (event.evt.ctrlKey || event.evt.metaKey || isDraggable) {
        return;
      }

      event.target.preventDefault();
      this.prevPos = this.stage.getPointerPosition();
      this.width(0);
      this.height(0);
      this.selecting = true;
    });

    this.stage.on('mousemove', (event) => {
      if (!this.selecting || !this.prevPos) {
        return;
      }

      event.target.preventDefault();
      const { x, y } = this.stage.getPointerPosition()!;
      const { x: x1, y: y1 } = this.prevPos;
      this.setAttrs({
        visible: true,
        x: Math.min(x, x1),
        y: Math.min(y, y1),
        width: Math.abs(x - x1),
        height: Math.abs(y - y1),
      });
    });

    this.stage.on('mouseup', () => {
      this.selecting = false;
      this.visible(false);
    });

    return () => {
      this.stage.off('mousedown');
      this.stage.off('mousemove');
      this.stage.off('mouseup');
    };
  }
}
