import Konva from 'konva';
import { NodeData } from '../../store/boardStore/node/type';
import img from './function.svg';
import { NodeHeader } from './header/NodeHeader';
import { NodeHeaderIcon } from './header/NodeHeaderIcon';
import { NodeHeaderText } from './header/NodeHeaderText';
import { NodeBody } from './body/NodeBody';

export class NodeUI extends Konva.Group {
  constructor({ name }: NodeData, option: Konva.GroupConfig) {
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
    const text = new NodeHeaderText(name);

    //body
    const bodyContainer = new NodeBody();

    this.add(headerRect, text, icon, bodyContainer);
  }
}
