import Konva from 'konva';
import { DRAG, NODE_TAG, PIN_COLOR } from '../../constants/canvas';
import { nodeStore } from '../../store/boardStore/node/nodeStore';
import { PinUI } from '../../views/node/pin/PinUI';
import { hexToRgba } from '../../utils/style';
import { reaction } from 'mobx';
import { Position } from '../../store/boardStore/node/type';
import { KonvaEventObject } from 'konva/lib/Node';
import { Bezier } from '../../views/node/line/bezier';

export class LineViewModel {
  dispose: () => void;
  dragging = false;

  constructor(public view: Bezier) {
    this.dispose = this.render();
  }

  updateBezierCurve = (
    startPos: Position,
    endPos: Position,
    waveHeight = 50
  ) => {
    // 제어점 위치 조정 (파도 높이 포함)
    const disX = endPos.x - startPos.x;
    const disY = endPos.y - startPos.y;

    // 파도 높이 조정 (중간 제어점의 Y 값을 파도 높이로 조정)
    const controlX1 = startPos.x + disX / 3;
    const controlY1 = startPos.y + disY / 3 - waveHeight;

    const controlX2 = endPos.x - disX / 3;
    const controlY2 = endPos.y - disY / 3 + waveHeight;

    this.view.points([
      startPos.x,
      startPos.y,
      controlX1,
      controlY1,
      controlX2,
      controlY2,
      endPos.x,
      endPos.y,
    ]);
  };

  addEventList() {
    this.view.on('mouseover', () => {
      if (this.view.id() === 'trying') {
        return;
      }

      this.view.setAttrs({
        strokeWidth: 5,
      });
    });

    this.view.on('mouseleave', () => {
      this.view.setAttrs({
        strokeWidth: 2,
      });
    });

    return () => {};
  }

  render() {
    const eventDispose = this.addEventList();
    return eventDispose;
  }
}
