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
  PIN_GAP,
  PIN_HEIGHT,
  TEXT_PIN_GAP,
} from '../../constants/canvas';

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
    let x = 0;
    let circleX = 0;
    let nextY = 0;
    let align = 'left';

    const radius = PIN_HEIGHT / 2;

    components.forEach(
      ({ id, owner, placement, children, class: c, properties: { name: pinName, type, uses } }) => {
        if (uses === 'Flow') {
          return;
        }

        if (placement === 'Input') {
          this.hasInput = true;
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
        const text = new NodeBodyText(pinName, {
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
          stroke: NODE_STROKE_COLOR,
        });

        const pinGroup = new Konva.Group({
          id,
        });
        pinGroup.add(text, circle);
        pins.push(pinGroup);
      }
    );
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
