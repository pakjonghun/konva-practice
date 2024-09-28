import { Position } from '../../store/nodeStore/types';
import { BaseViewModel } from '../base/baseViewModel';
import { SelectRect } from '../../views/dynamic/selectRect';
import { BaseStage } from '../../views/base/baseStage';
import { BaseRect } from '../../views/base/baseRect';
import { BACKGROUND, DRAG, PAINT, SELECT_STROKE_COLOR, TRANSFORMER } from '../../constants/canvas';
import Konva from 'konva';
import { KonvaEventObject, Node } from 'konva/lib/Node';

export class SelectRectViewModel extends BaseViewModel {
  private selectRectView: BaseRect;
  private transformerView: Konva.Transformer;
  private multiSelecting = false;
  private prevPos: null | Position = null;
  dispose: () => void;
  constructor(private stage: BaseStage) {
    super();
    this.selectRectView = new SelectRect();
    this.transformerView = new Konva.Transformer({
      id: TRANSFORMER,
      enabledAnchors: [],
      rotateEnabled: false,
      borderStroke: SELECT_STROKE_COLOR,
      borderStrokeWidth: 3,
    });
    this.transformerView.padding(2);
    this.dispose = this.addEventList();
  }

  get transformer() {
    return this.transformerView;
  }

  get selectRect() {
    return this.selectRectView;
  }

  getOtherEvent(event: KonvaEventObject<MouseEvent>) {
    const isDraggable = this.stage.draggable();
    const otherEvent = event.evt.ctrlKey || event.evt.metaKey || isDraggable;
    return otherEvent;
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
      const otherEvent = this.getOtherEvent(event);
      if (otherEvent) {
        return;
      }
      const selectedNodes = this.transformer.nodes();
      const isMultiSelected = selectedNodes.length > 1;

      const target = event.target;
      const nextShape = this.getParent(target);

      if (isMultiSelected) {
        const hasClicked = selectedNodes.some((node) => {
          return node === nextShape;
        });
        if (hasClicked) {
          return;
        }
      }

      const targetId = target.id();

      if (targetId === BACKGROUND) {
        event.target.preventDefault();
        this.selectRect.moveToTop();
        this.prevPos = this.selectRect.getLayer()?.getRelativePointerPosition()!;
        this.selectRect.width(0);
        this.selectRect.height(0);
        this.multiSelecting = true;
        const bgLayer = this.stage.findOne(`#${DRAG}`);
        this.selectRect.moveTo(bgLayer);
      } else {
        const nextShape = this.getParent(target);
        if (nextShape?.id() === 'node') {
          nextShape.moveToTop();
          this.transformer.nodes([nextShape]);
        }
      }
    });

    this.stage.on('mousemove', (event) => {
      const otherEvent = this.getOtherEvent(event);
      if (otherEvent) {
        return;
      }

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

    this.stage.on('mouseup', (event) => {
      const otherEvent = this.getOtherEvent(event);
      if (otherEvent) {
        return;
      }

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
        const bgLayer = this.stage.findOne(`#${PAINT}`);
        this.selectRect.moveTo(bgLayer);
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
