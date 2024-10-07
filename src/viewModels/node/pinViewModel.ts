import Konva from 'konva';
import { DRAG, NODE_TAG, PIN_COLOR } from '../../constants/canvas';
import { nodeStore } from '../../store/boardStore/node/nodeStore';
import { PinUI } from '../../views/node/pin/PinUI';
import { hexToRgba } from '../../utils/style';
import { reaction } from 'mobx';
import { Position } from '../../store/boardStore/node/type';
import { KonvaEventObject } from 'konva/lib/Node';
import { Bezier } from '../../views/node/line/bezier';
import { LineViewModel } from './lineViewModel';

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
    const pinData = nodeStore.getTargetPinData(this.pinId);
    return pinData;
  }

  get color() {
    const pinData = this.pinData;
    const color = PIN_COLOR[pinData.properties.type as string] ?? '#808080';
    return color;
  }

  addEventList() {
    const pinUI = this.view;

    pinUI.on('mouseover', () => {
      pinUI.circle.setAttrs({
        fill: hexToRgba(this.color, 0.5),
      });
    });

    pinUI.on('mouseleave', () => {
      if (this.dragging) {
        return;
      }
      pinUI.circle.setAttrs({
        fill: 'transparent',
      });
    });

    pinUI.on('mousedown', (event) => {
      this.dragging = true;
      this.layer.find(`.${NODE_TAG}`).forEach((node) => {
        node.setAttrs({
          draggable: false,
        });
      });
      const radius = pinUI.circle.radius();
      const x = pinUI.circle.x() + radius;
      const y = pinUI.circle.y() + radius * 2;
      const bezierLine = new Bezier({
        id: 'trying',
        points: [x, y, x, y, x, y, x, y],
        stroke: this.color,
      });
      this.layer.add(bezierLine);
      bezierLine.moveToTop();

      const stage = event.target.getStage();

      const mouseMoveHandler = (e: KonvaEventObject<MouseEvent>) => {
        const stage = e.target.getStage();
        if (!this.dragging || !stage) {
          return;
        }
        const pointerPos = stage.getPointerPosition();
        if (!pointerPos) {
          return;
        }
        const circlePos = this.view.circle.getAbsolutePosition();

        const endPos = this.layer.getAbsoluteTransform().copy().invert().point(pointerPos);
        const startPos = this.layer.getAbsoluteTransform().copy().invert().point(circlePos);

        const bezier = new LineViewModel(bezierLine);
        bezier.updateBezierCurve(startPos, endPos);

        // function updateBezierCurve(
        //   startPos: Position,
        //   endPos: Position,
        //   waveHeight = 50
        // ) {
        //   // 제어점 위치 조정 (파도 높이 포함)
        //   const disX = endPos.x - startPos.x;
        //   const disY = endPos.y - startPos.y;

        //   // 파도 높이 조정 (중간 제어점의 Y 값을 파도 높이로 조정)
        //   const controlX1 = startPos.x + disX / 3;
        //   const controlY1 = startPos.y + disY / 3 - waveHeight;

        //   const controlX2 = endPos.x - disX / 3;
        //   const controlY2 = endPos.y - disY / 3 + waveHeight;

        //   bezierLine.points([
        //     startPos.x,
        //     startPos.y,
        //     controlX1,
        //     controlY1,
        //     controlX2,
        //     controlY2,
        //     endPos.x,
        //     endPos.y,
        //   ]);
        // }
        const dragLayer = stage.findOne(`.${DRAG}`);
        bezierLine.moveTo(dragLayer);
        this.layer.batchDraw();
      };

      stage?.on('mousemove', mouseMoveHandler);

      const mouseUpHandler = () => {
        this.dragging = false;
        pinUI.circle.setAttrs({
          fill: 'transparent',
        });
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
    reaction(
      () => {
        return this.pinData.properties.type;
      },
      (pinType) => {
        const view = this.view;
        const newColor = view.colorByType(pinType);
        view.circle.setAttrs({
          stroke: newColor,
        });
      }
    );

    const eventDispose = this.addEventList();
    return eventDispose;
  }
}
