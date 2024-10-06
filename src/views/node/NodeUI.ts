import Konva from 'konva';
import { NodeData } from '../../store/boardStore/node/type';
import img from './function.svg';
import { NodeHeader } from './header/NodeHeader';
import { NodeHeaderIcon } from './header/NodeHeaderIcon';
import { NodeHeaderText } from './header/NodeHeaderText';
import { NodeBody } from './body/NodeBody';
import { NodeBodyText } from './body/NodeBodyText';
import {
  NODE_BODY_HEIGHT,
  NODE_HEADER_HEIGHT,
  NODE_STROKE_COLOR,
  NODE_WIDTH,
  PIN_COLOR,
  PIN_GAP,
  PIN_HEIGHT,
  TEXT_PIN_GAP,
} from '../../constants/canvas';

import stringImg from './pin/string.svg';
import numberImg from './pin/number.svg';
import unknownImg from './pin/unknown.svg';

export class NodeUI extends Konva.Group {
  hasInput = false;
  headerTitle: Konva.Text;
  constructor({ name, components }: NodeData, option: Konva.GroupConfig) {
    super(option);
    //header
    const iconImg = new Image();
    iconImg.src = img;
    const icon = new NodeHeaderIcon(iconImg);
    const headerRect = new NodeHeader();
    this.headerTitle = new NodeHeaderText(name);

    //body
    const bodyContainer = new NodeBody();

    //pin
    const pins: Konva.Group[] = [];

    let inputY = NODE_HEADER_HEIGHT + PIN_GAP;
    let outputY = NODE_HEADER_HEIGHT + PIN_GAP;
    let textX = 0;
    let circleX = 0;
    let nextY = 0;
    let align = 'left';
    let iconX = 0;

    const radius = PIN_HEIGHT / 2;

    components.forEach((component) => {
      const {
        id,
        owner,
        placement,
        children,
        class: c,
        properties: { name: pinName, type, uses },
      } = component;

      if (uses === 'Flow') {
        return;
      }

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

      if (placement === 'Input') {
        this.hasInput = true;
        nextY = inputY;
        textX = PIN_GAP * 3;
        iconX = PIN_GAP / 2;
        circleX = 0 - radius - TEXT_PIN_GAP;
        inputY += PIN_HEIGHT + PIN_GAP;
        align = 'left';
      } else {
        nextY = outputY;
        textX = NODE_WIDTH / 2 - PIN_GAP * 3;
        iconX = NODE_WIDTH - PIN_GAP * 2;
        circleX = NODE_WIDTH + TEXT_PIN_GAP + radius;
        outputY += PIN_HEIGHT + PIN_GAP;
        align = 'right';
      }
      const text = new NodeBodyText(pinName, {
        x: textX,
        y: nextY,
        height: PIN_HEIGHT,
        align,
        width: NODE_WIDTH / 2,
        verticalAlign: 'middle',
        fill: color,
        fontSize: 16,
      });

      icon.setAttrs({
        x: iconX,
        y: nextY + 2,
        width: (PIN_HEIGHT * 2) / 3,
        height: (PIN_HEIGHT * 2) / 3,
      });

      const circle = new Konva.Circle({
        x: circleX,
        y: nextY + radius,
        radius: radius,
        fill: 'white',
        stroke: NODE_STROKE_COLOR,
        strokeWidth: 1,
      });

      const pinGroup = new Konva.Group({
        id,
      });
      pinGroup.add(text, icon, circle);
      pins.push(pinGroup);
    });
    const maxBodyHeight = Math.max(inputY, outputY);
    const maxHeight = maxBodyHeight - NODE_HEADER_HEIGHT;
    if (maxHeight > NODE_BODY_HEIGHT) {
      bodyContainer.height(maxHeight);
    }

    this.add(headerRect, this.headerTitle, icon, bodyContainer);
    pins.forEach((pin) => {
      this.add(pin);
    });
  }
}
