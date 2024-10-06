import Konva from 'konva';
import { DRAG, NODE_BODY_FILL_COLOR, NODE_TAG, PIN_COLOR } from '../../constants/canvas';
import { nodeStore } from '../../store/boardStore/node/nodeStore';
import { PinUI } from '../../views/node/pin/PinUI';

export class PinViewModel {
  dispose: () => void;
  dragging = false;

  constructor(public layer: Konva.Layer, public pinId: string, public owner: string) {
    this.dispose = this.render();
  }

  get view(): PinUI {
    const pinUI = this.layer.findOne(`#${this.pinId}`) as PinUI;
    if (!pinUI) {
      throw new Error(`${this.pinId} PinUI 가 존재하지 않습니다.`);
    }

    return pinUI;
  }

  get pinData() {
    const pinData = nodeStore.getTargetNodeData(this.owner).getPinById(this.pinId);
    if (!pinData) {
      throw new Error('핀 데이터가 존재하지 않습니다.');
    }
    return pinData;
  }

  get color() {
    const pinData = this.pinData;
    const color = PIN_COLOR[pinData.properties.type as string] ?? 'gray';
    return color;
  }

  addEventList() {
    const pinUI = this.view;

    pinUI.on('mouseover', () => {
      pinUI.circle.innerCircle.setAttrs({
        fill: this.color,
      });
    });

    pinUI.on('mouseleave', () => {
      pinUI.circle.innerCircle.setAttrs({
        fill: NODE_BODY_FILL_COLOR,
      });
    });

    pinUI.on('mousedown', (event) => {
      this.dragging = true;
      this.layer.find(`.${NODE_TAG}`).forEach((node) => {
        node.setAttrs({
          draggable: false,
        });
      });

      const radius = pinUI.circle.outerCircle.radius();
      const x = pinUI.circle.outerCircle.x() + radius * 2;
      const y = pinUI.circle.outerCircle.y() + radius * 2;

      const bezierLine = new Konva.Line({
        points: [x, y, x, y, x, y, x, y],
        stroke: this.color,
        strokeWidth: 2,
        lineCap: 'round',
        lineJoin: 'round',
        tension: 0, // tension을 0으로 설정하여 제어점 직접 사용
        bezier: true, // 베지에 곡선 사용
      });

      this.layer.add(bezierLine);
      bezierLine.moveToTop();

      const stage = event.target.getStage();

      const mouseMoveHandler = () => {
        if (!this.dragging || !stage) {
          return;
        }
        const pos = stage.getPointerPosition();
        if (!pos) {
          return;
        }
        // 시작점과 끝점 설정
        const endX = x + pos.x;
        const endY = pos.y;

        // 시작점과 끝점 사이의 거리 계산
        const disX = endX - x;
        const disY = endY - y;

        // 제어점 1: 시작점에서 끝점까지의 1/3 지점에 위치
        const controlX1 = x + disX / 3;
        const controlY1 = y + disY / 3;

        // 제어점 2: 끝점에서 시작점까지의 1/3 지점에 위치
        const controlX2 = endX - disX / 3;
        const controlY2 = endY - disY / 3;

        bezierLine.points([x, y, controlX1, controlY1, controlX2, controlY2, pos.x, pos.y]);
        const dragLayer = stage.findOne(`.${DRAG}`);
        console.log('dragLayer : ', dragLayer);
        bezierLine.moveTo(dragLayer);
        this.layer.batchDraw();
      };

      stage?.on('mousemove', mouseMoveHandler);

      const mouseUpHandler = () => {
        this.dragging = false;
        this.layer.find(`.${NODE_TAG}`).forEach((node) => {
          node.setAttrs({
            draggable: true,
          });
        });
        bezierLine.moveTo(this.layer);
        bezierLine.destroy();

        stage?.off('mouseup', mouseUpHandler);
        stage?.off('mousemove', mouseMoveHandler);
      };
      stage?.on('mouseup', mouseUpHandler);
    });

    return () => {
      pinUI.off('mouseover');
      pinUI.off('mouseleave');
      pinUI.off('mousedown');
    };
  }

  render() {
    const eventDispose = this.addEventList();
    return eventDispose;
  }
}
