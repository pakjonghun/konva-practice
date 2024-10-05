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
  NODE_WIDTH,
  PIN_HEIGHT,
} from '../../constants/canvas';

export class NodeUI extends Konva.Group {
  constructor({ name, components }: NodeData, option: Konva.GroupConfig) {
    super({
      ...option,
      hitGraphEnabled: true,
      visible: true,
    });
    this.moveToTop();

    //header
    const iconImg = new Image();
    iconImg.src = img;
    const icon = new NodeHeaderIcon(iconImg);
    const headerRect = new NodeHeader();
    const title = new NodeHeaderText(name);

    //body
    const bodyContainer = new NodeBody();

    //pin
    const pins: Konva.Group[] = [];
    const PIN_GAP = 12;
    const TEXT_PIN_GAP = 5;
    let inputY = NODE_HEADER_HEIGHT + PIN_GAP;
    let outputY = NODE_HEADER_HEIGHT + PIN_GAP;
    let x = 0;
    let circleX = 0;
    let align = 'left';
    const inputX = +PIN_GAP;
    const radius = PIN_HEIGHT / 2;
    components.forEach(
      ({ id, owner, placement, children, class: c, properties: { name, type, uses } }) => {
        if (uses === 'Flow') {
          return;
        }
        let nextY = 0;
        if (placement === 'Input') {
          nextY = inputY;
          x = inputX;
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
          fill: 'white',
        });

        const pinGroup = new Konva.Group({
          id,
        });
        pinGroup.add(text, circle);
        pins.push(pinGroup);
      }
    );
    const maxBodyHeight = Math.max(inputY, outputY);
    const maxHeight = maxBodyHeight + PIN_GAP - NODE_HEADER_HEIGHT;
    if (maxHeight > NODE_BODY_HEIGHT) {
      bodyContainer.height(maxHeight);
    }

    this.add(headerRect, title, icon, bodyContainer);
    pins.forEach((pin) => {
      this.add(pin);
    });

    // this.cache();
  }
}
