import Konva from 'konva';
import { ComponentCommon } from '../../../store/boardStore/node/type';
import stringImg from './string.svg';
import numberImg from './number.svg';
import unknownImg from './unknown.svg';
import { NodeHeaderIcon } from '../header/NodeHeaderIcon';
import { NodeBodyText } from '../body/NodeBodyText';
import {
  NODE_BODY_FILL_COLOR,
  NODE_STROKE_COLOR,
  NODE_WIDTH,
  PIN_COLOR,
  PIN_HEIGHT,
} from '../../../constants/canvas';

type PinProp = {
  textX: number;
  iconX: number;
  circleX: number;
  nextY: number;
  align: string;
};

export class PinUI extends Konva.Group {
  constructor(
    { id, class: c, owner, placement, properties: { name, type }, children }: ComponentCommon,
    { align, circleX, iconX, nextY, textX }: PinProp,
    option: Konva.GroupConfig
  ) {
    super(option);

    const radius = (PIN_HEIGHT * 4.7) / 10;

    const iconImg = new Image();
    switch (type) {
      case 'string':
        iconImg.src = stringImg;
        break;

      case 'number':
        iconImg.src = numberImg;
        break;

      default:
        iconImg.src = unknownImg;
        break;
    }
    const color = PIN_COLOR[type as string] ?? 'gray';
    const icon = new NodeHeaderIcon(iconImg);

    const text = new NodeBodyText(name, {
      x: textX,
      y: nextY,
      height: PIN_HEIGHT,
      width: NODE_WIDTH / 2,
      align,

      verticalAlign: 'middle',
      fill: color,
      fontSize: 15,
    });

    icon.setAttrs({
      x: iconX,
      y: nextY + 3,
      scale: { x: 0.7, y: 0.7 },
    });

    const circle = new Konva.Circle({
      x: circleX,
      y: nextY + radius,
      radius: radius,
      fill: NODE_BODY_FILL_COLOR,
      stroke: NODE_STROKE_COLOR,
      strokeWidth: 1.4,
    });

    this.add(text, icon, circle);
  }
}
