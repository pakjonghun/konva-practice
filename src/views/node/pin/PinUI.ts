import Konva from 'konva';
import { ComponentCommon } from '../../../store/boardStore/node/type';
import stringImg from './icon/string.svg';
import numberImg from './icon/number.svg';
import unknownImg from './icon/unknown.svg';
import {
  PIN_COLOR,
  PIN_HEIGHT,
  PIN_TEXT_COLOR,
} from '../../../constants/canvas';
import { PinText } from './PinText';
import { PinIcon } from './PinIcon';
import { PinCircle } from './PinCircle';

type PinProp = {
  textX: number;
  iconX: number;
  circleX: number;
  nextY: number;
  align: string;
};

export class PinUI extends Konva.Group {
  circle: PinCircle;

  constructor(
    {
      id,
      class: c,
      owner,
      placement,
      properties: { name, type },
      children,
    }: ComponentCommon,
    { align, circleX, iconX, nextY, textX }: PinProp,
    option: Konva.GroupConfig
  ) {
    super({
      ...option,
    });

    const radius = (PIN_HEIGHT * 4.7) / 10;

    // const iconImg = new Image();
    // switch (type) {
    //   case 'string':
    //     iconImg.src = stringImg;
    //     break;

    //   case 'number':
    //     iconImg.src = numberImg;
    //     break;

    //   default:
    //     iconImg.src = unknownImg;
    //     break;
    // }
    // const icon = new PinIcon(iconImg);
    // const color = PIN_COLOR[type as string] ?? 'gray';

    const text = new PinText(name, {
      x: textX,
      y: nextY,
      align,
      // fill: color,
      fill: PIN_TEXT_COLOR,
    });

    // icon.setAttrs({
    //   x: iconX,
    //   y: nextY + 4,
    //   scale: { x: 0.7, y: 0.7 },
    // });

    this.circle = new PinCircle({
      x: circleX,
      y: nextY + radius,
      radius: radius,
    });

    this.add(text, this.circle);
  }
}
