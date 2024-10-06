import { BaseViewModel } from '../base/baseViewModel';
import { SelectRect } from '../../views/board/selectRect';
import { BaseStage } from '../../views/base/BaseStage';
import { BaseRect } from '../../views/base/BaseRect';
import {
  BACKGROUND,
  DRAG,
  PAINT,
  SELECT_STROKE_COLOR,
  TRANSFORMER_RECT,
  NODE_TAG,
} from '../../constants/canvas';
import Konva from 'konva';
import { KonvaEventObject, Node } from 'konva/lib/Node';
import { Position } from '../../store/boardStore/node/type';
import { Vector2d } from 'konva/lib/types';
import { inspectorStore } from '../../store/boardStore/inspector/inspectorStore';

export class SelectRectViewModel extends BaseViewModel {
  private selectRectView: BaseRect;
  private transformerView: Konva.Transformer;
  private multiSelecting = false;
  private prevPos: null | Position = null;
  private isSpaceDown = false;
  dispose: () => void;
  constructor(private stage: BaseStage) {
    super();
    this.selectRectView = new SelectRect();
    this.transformerView = new Konva.Transformer({
      // shouldOverdrawWholeArea: true,
      name: TRANSFORMER_RECT,
      enabledAnchors: [],
      rotateEnabled: false,
      borderStroke: SELECT_STROKE_COLOR,
      borderStrokeWidth: 3,
    });

    this.transformerView.padding(3);
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
    const otherEvent = event.evt.ctrlKey || event.evt.metaKey || isDraggable || this.isSpaceDown;
    return otherEvent;
  }

  readyToMultiSelect = () => {
    this.selectRect.moveToTop();
    this.prevPos = this.selectRect.getLayer()?.getRelativePointerPosition()!;
    this.selectRect.width(0);
    this.selectRect.height(0);
    this.multiSelecting = true;
    const bgLayer = this.stage.findOne(`.${DRAG}`);
    this.selectRect.moveTo(bgLayer);
  };

  moveToTop = (target: Konva.Node) => {
    target.moveToTop();
    this.transformer.moveToTop();
  };

  addEventList() {
    const container = this.stage.container();
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        this.isSpaceDown = true;
      }
    };

    const keyUpHandler = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        this.isSpaceDown = false;
      }
    };

    container.addEventListener('keydown', keyDownHandler);
    container.addEventListener('keyup', keyUpHandler);

    this.stage.on('mousedown', (event) => {
      const otherEvent = this.getOtherEvent(event);
      if (otherEvent) {
        return;
      }
      const selectedNodes = this.transformer.nodes();
      const target = event.target;
      const parent = getParent(target);

      //다운일때 그 자리가 백그라운드면 seleRect 보이게 하고 그릴준비만 한다.
      const targetName = target.name();
      if (targetName === BACKGROUND) {
        event.target.preventDefault();
        this.readyToMultiSelect();
        return;
      }

      //만약 노드를 클릭했는데 그 노드가 멀티셀렉된 노드가 아니라면 그 노드를 선택하고 종료한다.
      if (parent?.name() === NODE_TAG) {
        if (!selectedNodes.some((n) => n === parent)) {
          this.transformer.nodes([parent]);
          this.moveToTop(parent);

          //선택된 범위가 핀을 제외한 범위한 포함하도록 하는 로직 필요
          // const shapeRect = parent.getClientRect();
          // const originW = shapeRect.width;
          // if (originW > NODE_WIDTH) {
          //   const scale = NODE_WIDTH / originW;

          //   this.transformer.offsetX((parent as NodeUI).hasInput ? -30 : 0);
          //   this.transformer.scaleX(scale);
          // }
          return;
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
        const shapes = this.stage.find(`.${NODE_TAG}`);
        const nodes = shapes.filter((shape) =>
          Konva.Util.haveIntersection(shape.getClientRect(), box)
        );
        this.transformer.nodes(nodes);

        nodes.forEach((node) => {
          node.moveToTop();
        });
        this.transformer.moveToTop();
        this.multiSelecting = false;
        this.prevPos = null;
        const bgLayer = this.stage.findOne(`.${PAINT}`);
        this.selectRect.moveTo(bgLayer);
        this.selectRect.visible(false);
      }

      this.trackSelectNodeList();
    });

    return () => {
      container.removeEventListener('keyup', keyUpHandler);
      container.removeEventListener('keydown', keyDownHandler);
      this.stage.off('mousedown');
      this.stage.off('mousemove');
      this.stage.off('mouseup');
    };
  }

  //마우스 업 할때 상태가 동기화가 확실하게 됨. 다운 상태는 실제로 선택 안된것도 포함되거나 누락되는경우 있음.
  trackSelectNodeList() {
    const selectedNodes = this.transformer.nodes();
    inspectorStore.setSelectedNodeIdList(selectedNodes.map((n) => n.id()));
  }
}

//공통함수 나중에 분리해서 유틸리티함수 모음에 넣어야 함.
function isPointInRect(node: Konva.Node, { x, y }: Vector2d): boolean {
  const rect = node.getClientRect(); // node의 clientRect 얻기
  return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height;
}

function getParent(target?: Node | null): Node | null | undefined {
  if (target?.name() === NODE_TAG) {
    return target;
  }

  if (target?.parent) {
    return getParent(target.parent);
  }

  return target;
}
