import { Position } from '../../store/nodeStore/types';
import { BaseViewModel } from '../base/baseViewModel';
import { SelectRect } from '../../views/dynamic/selectRect';
import { BaseStage } from '../../views/base/baseStage';
import { BaseRect } from '../../views/base/baseRect';

export class SelectRectViewModel extends BaseViewModel {
  private selectRectView: BaseRect;
  private selecting = false;
  private prevPos: null | Position = null;
  dispose: () => void;
  constructor(private stage: BaseStage) {
    super();
    this.selectRectView = new SelectRect();
    this.dispose = this.addEventList();
  }

  get selectRect() {
    return this.selectRectView;
  }

  addEventList() {
    this.stage.on('mousedown', (event) => {
      const isDraggable = this.stage.draggable();
      if (event.evt.ctrlKey || event.evt.metaKey || isDraggable) {
        return;
      }

      event.target.preventDefault();
      this.selectRect.moveToTop();
      this.prevPos = this.selectRect.getLayer()?.getRelativePointerPosition()!;
      this.selectRect.width(0);
      this.selectRect.height(0);
      this.selecting = true;
    });

    this.stage.on('mousemove', (event) => {
      if (!this.selecting || !this.prevPos) {
        return;
      }

      event.target.preventDefault();
      const layer = this.selectRect.getLayer();

      const { x, y } = layer?.getRelativePointerPosition()!;
      const { x: x1, y: y1 } = this.prevPos;
      this.selectRect.setAttrs({
        visible: true,
        x: Math.min(x, x1),
        y: Math.min(y, y1),
        width: Math.abs(x - x1),
        height: Math.abs(y - y1),
      });
    });

    this.stage.on('mouseup', () => {
      this.selecting = false;
      this.selectRect.visible(false);
    });

    return () => {
      this.stage.off('mousedown');
      this.stage.off('mousemove');
      this.stage.off('mouseup');
    };
  }
}
