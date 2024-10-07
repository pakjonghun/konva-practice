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
