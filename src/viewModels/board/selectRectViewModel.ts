import { Position } from '../../store/nodeStore/types';
import { BaseViewModel } from '../base/baseViewModel';
import { SelectRect } from '../../views/dynamic/selectRect';
import { BaseStage } from '../../views/base/baseStage';
import { BaseRect } from '../../views/base/baseRect';
import { BACKGROUND } from '../../constants/canvas';
import Konva from 'konva';
import { Node } from 'konva/lib/Node';
import { Size } from '../../store/boardStore/types';

export class SelectRectViewModel extends BaseViewModel {
  private selectRectView: BaseRect;
  private transformerView: Konva.Transformer;
  private multiSelecting = false;
  private prevPos: null | Position = null;
  dispose: () => void;
  constructor(private stage: BaseStage) {
    super();
    this.selectRectView = new SelectRect();
    this.transformerView = new Konva.Transformer();
    this.dispose = this.addEventList();
  }

  get transformer() {
    return this.transformerView;
  }

  get selectRect() {
    return this.selectRectView;
  }

  getParent(target?: Node | null): Node | null | undefined {
    if (target?.id() === 'node') {
      return target;
    }

    if (target?.parent) {
      return this.getParent(target.parent);
    }

    return target;
  }

  addEventList() {
    this.stage.on('mousedown', (event) => {
      const isDraggable = this.stage.draggable();
      const otherEvent = event.evt.ctrlKey || event.evt.metaKey || isDraggable;
      const selectedNodes = this.transformer.nodes();
      const isMultiSelected = selectedNodes.length > 1;
      if (otherEvent) {
        return;
      }

      if (isMultiSelected) {
        const box = this.transformer.getClientRect();
        const pos = this.transformer.getLayer()?.getRelativePointerPosition();
        const isInTransformer = isPointInRect(box, pos ?? null);
        if (isInTransformer) {
          return;
        }
      }

      const target = event.target;
      const targetId = target.id();

      if (targetId === BACKGROUND) {
        event.target.preventDefault();
        this.selectRect.moveToTop();
        this.prevPos = this.selectRect.getLayer()?.getRelativePointerPosition()!;
        this.selectRect.width(0);
        this.selectRect.height(0);
        this.multiSelecting = true;
      }

      if (target.getType() !== 'Stage') {
        const nextShape = this.getParent(target);
        if (nextShape?.id() === 'node') {
          nextShape.moveToTop();
          this.transformer.nodes([nextShape]);
        }
      }
    });

    this.stage.on('mousemove', (event) => {
      if (!this.multiSelecting || !this.prevPos) {
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
      if (this.multiSelecting) {
        const box = this.selectRect.getClientRect();
        const shapes = this.stage.find('#node');
        const nodes = shapes.filter((shape) =>
          Konva.Util.haveIntersection(shape.getClientRect(), box)
        );
        this.transformer.nodes(nodes);

        nodes.forEach((node) => {
          node.moveToTop();
        });
        this.transformer.moveToTop();

        this.multiSelecting = false;
        this.selectRect.visible(false);
      }
    });

    return () => {
      this.stage.off('mousedown');
      this.stage.off('mousemove');
      this.stage.off('mouseup');
    };
  }
}

function isPointInRect(rect: Size & Position, point: Position | null) {
  if (!point) {
    return false;
  }
  return (
    point.x >= rect.x &&
    point.x <= rect.x + rect.width &&
    point.y >= rect.y &&
    point.y <= rect.y + rect.height
  );
}
