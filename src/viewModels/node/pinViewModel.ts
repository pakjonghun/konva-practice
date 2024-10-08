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
import { Layer } from 'konva/lib/Layer';

export class PinViewModel {
  dispose: () => void;
  dragging = false;

  constructor(
    public layer: Konva.Layer,
    public pinId: string,
    public owner: string
  ) {
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
      const bezierLine = new Bezier(this.pinData.owner, '', {
        id: 'trying',
        points: [x, y, x, y, x, y, x, y],
        stroke: this.color,
      });
      const stage = event.target.getStage();
      const dragLayer = stage?.findOne(`.${DRAG}`) as Layer;
      dragLayer.add(bezierLine);
      bezierLine.moveToTop();

      const mouseMoveHandler = (e: KonvaEventObject<MouseEvent>) => {
        const stage = e.target.getStage();
        const dr = stage?.findOne(`.${DRAG}`) as Layer;
        if (!dr) return;

        if (!this.dragging || !stage) {
          return;
        }
        const pointerPos = stage.getPointerPosition();
        if (!pointerPos) {
          return;
        }
        const circlePos = this.view.circle.getAbsolutePosition();

        const endPos = dr
          .getAbsoluteTransform()
          .copy()
          .invert()
          .point(pointerPos);
        const startPos = dr
          .getAbsoluteTransform()
          .copy()
          .invert()
          .point(circlePos);

        const bezier = new LineViewModel(bezierLine);
        bezier.view.updateBezierCurve(startPos, endPos);
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
