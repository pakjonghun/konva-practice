import Konva from 'konva';
import { ComponentCommon, NodeData } from '../../../store/boardStore/node/type';
import stringImg from './string.svg';
import numberImg from './number.svg';
import unknownImg from './unknown.svg';
import { NodeHeader } from '../header/NodeHeader';
import { NodeHeaderIcon } from '../header/NodeHeaderIcon';
import { NodeHeaderText } from '../header/NodeHeaderText';
import { NodeBody } from '../body/NodeBody';
import { NodeBodyText } from '../body/NodeBodyText';
import {
  NODE_BODY_HEIGHT,
  NODE_HEADER_HEIGHT,
  NODE_STROKE_COLOR,
  NODE_WIDTH,
  PIN_COLOR,
  PIN_GAP,
  PIN_HEIGHT,
  TEXT_PIN_GAP,
} from '../../../constants/canvas';

type PinProp = {
  inputY: number;
  outputY: number;
  x: number;
  circleX: number;
  nextY: number;
  align: string;
};

export class PinUI extends Konva.Group {
  constructor(
    { id, class: c, owner, placement, properties: { name, type }, children }: ComponentCommon,
    { inputY, outputY, x, circleX, nextY, align }: PinProp,
    option: Konva.GroupConfig
  ) {
    super(option);

    //pinIcon
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
    const icon = new NodeHeaderIcon(iconImg);
    const color = PIN_COLOR[type as string];

    //pin
    const radius = PIN_HEIGHT / 2;
    if (placement === 'Input') {
      nextY = inputY;
      x = PIN_GAP;
      circleX = 0 - radius - TEXT_PIN_GAP;
      inputY += PIN_HEIGHT + PIN_GAP;
      align = 'left';
    } else {
      nextY = outputY;
      x = NODE_WIDTH / 2 - PIN_GAP;
      circleX = NODE_WIDTH + TEXT_PIN_GAP + radius;
      outputY += PIN_HEIGHT + PIN_GAP;
      align = 'right';
    }
    const text = new NodeBodyText(name, {
      x,
      y: nextY,
      height: PIN_HEIGHT,
      align,
      width: NODE_WIDTH / 2,
      verticalAlign: 'middle',
    });

    const circle = new Konva.Circle({
      x: circleX,

      y: nextY + radius,
      radius: radius,
      fill: color,
      stroke: color,
    });

    this.add(text, circle);
  }
}
