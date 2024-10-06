import Konva from 'konva';
import { NodeData } from '../../store/boardStore/node/type';
import {
  DRAG,
  NODE_BODY_FILL_COLOR,
  NODE_TAG,
  PAINT,
  PIN_COLOR,
  TRANSFORMER_RECT,
} from '../../constants/canvas';
import { NodeUI } from '../../views/node/NodeUI';
import { nodeStore } from '../../store/boardStore/node/nodeStore';
import { PinUI } from '../../views/node/pin/PinUI';

export class PinViewModel {
  dispose: () => void;

  constructor(public layer: Konva.Layer, public pinId: string, public owner: string) {
    // this.dispose = this.render();
    this.dispose = this.addEventList();
  }

  get view(): PinUI {
    const pinUI = this.layer.findOne(`#${this.pinId}`) as PinUI;
    if (!pinUI) {
      throw new Error(`${this.pinId} PinUI 가 존재하지 않습니다.`);
    }

    return pinUI;
  }

  updateTitle = (newTitle: string) => {};

  get pinData() {
    const pinData = nodeStore.getTargetNodeData(this.owner).getPinById(this.pinId);
    if (!pinData) {
      throw new Error('핀 데이터가 존재하지 않습니다.');
    }
    return pinData;
  }

  addEventList() {
    const pinUI = this.view;

    pinUI.on('mouseover', (event) => {
      const pinData = this.pinData;
      const color = PIN_COLOR[pinData.properties.type as string] ?? 'gray';
      console.log('pinui', pinUI);
      pinUI.circle.innerCircle.setAttrs({
        fill: color,
      });
    });

    pinUI.on('mouseleave', (event) => {
      pinUI.circle.innerCircle.setAttrs({
        fill: NODE_BODY_FILL_COLOR,
      });
    });

    return () => {
      pinUI.off('mouseover');
    };
  }

  render() {
    const eventDispose = this.addEventList();
    return eventDispose;
  }
}
