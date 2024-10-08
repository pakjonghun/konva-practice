import Konva from 'konva';
import { NodeData } from '../../store/boardStore/node/type';
import functionImg from './icon/function.svg';
import specialImg from './icon/special.svg';
import { NodeHeader } from './header/NodeHeader';
import { NodeHeaderIcon } from './header/NodeHeaderIcon';
import { NodeHeaderText } from './header/NodeHeaderText';
import { NodeBody } from './body/NodeBody';
import {
  NODE_BODY_HEIGHT,
  NODE_HEADER_HEIGHT,
  NODE_WIDTH,
  PIN_GAP,
  PIN_HEIGHT,
  TEXT_PIN_GAP,
} from '../../constants/canvas';
import { PinUI } from './pin/PinUI';

export class NodeUI extends Konva.Group {
  hasInput = false;
  headerTitle: Konva.Text;
  constructor({ name, components }: NodeData, option: Konva.GroupConfig) {
    super(option);
    //header
    const iconImg = new Image();

    if (name === 'ip') {
      iconImg.src = functionImg;
    } else {
      iconImg.src = specialImg;
    }

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

    const radius = (PIN_HEIGHT * 4.7) / 10;

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

      if (placement === 'Input') {
        this.hasInput = true;
        nextY = inputY;
        textX = PIN_GAP;
        iconX = PIN_GAP / 2;
        circleX = 0 - radius - TEXT_PIN_GAP;
        inputY += PIN_HEIGHT + PIN_GAP;
        align = 'left';
      } else {
        nextY = outputY;
        textX = NODE_WIDTH / 2 - PIN_GAP;
        iconX = NODE_WIDTH - PIN_GAP * 1.7;
        circleX = NODE_WIDTH + TEXT_PIN_GAP + radius;
        outputY += PIN_HEIGHT + PIN_GAP;
        align = 'right';
      }
      const pinUI = new PinUI(component, { align, circleX, iconX, nextY, textX }, { id });
      pins.push(pinUI);
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
