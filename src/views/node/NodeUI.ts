import Konva from 'konva';
import { NodeData } from '../../store/boardStore/node/type';
import {
  NODE_BODY_HEIGHT,
  NODE_FILL_COLOR,
  NODE_FONT_SIZE,
  NODE_HEADER_HEIGHT,
  NODE_ICON_SIZE,
  NODE_RADIUS,
  NODE_STROKE_COLOR,
  NODE_WIDTH,
} from '../../constants/canvas';
import img from './function.svg';

export class NodeUI extends Konva.Group {
  private icon: Konva.Image;

  constructor({ name }: NodeData, option: Konva.GroupConfig) {
    super(option);

    //헤더
    const headerRect = new Konva.Rect({
      x: 0,
      y: 0,
      stroke: NODE_STROKE_COLOR,
      width: NODE_WIDTH,
      height: NODE_HEADER_HEIGHT,
      fill: NODE_FILL_COLOR,
      cornerRadius: [NODE_RADIUS, NODE_RADIUS, 0, 0],
    });

    //헤더 아이콘
    const iconImg = new Image();
    iconImg.src = img;
    this.icon = new Konva.Image({
      x: 5,
      y: NODE_HEADER_HEIGHT / 2 - NODE_ICON_SIZE / 2,
      width: NODE_ICON_SIZE,
      height: NODE_ICON_SIZE,
      image: iconImg,
    });

    iconImg.onload = () => {
      this.icon.image(iconImg);
      this.getLayer()?.batchDraw();
    };

    //헤더 텍스트
    const text = new Konva.Text({
      x: 30,
      fontSize: NODE_FONT_SIZE,
      y: NODE_HEADER_HEIGHT / 2 - NODE_FONT_SIZE / 2,
      text: name,
      fill: 'black',
      align: 'left',
    });

    //body container
    const bodyContainer = new Konva.Rect({
      x: 0,
      stroke: NODE_STROKE_COLOR,
      y: NODE_HEADER_HEIGHT,
      width: NODE_WIDTH,
      height: NODE_BODY_HEIGHT,
      fill: NODE_FILL_COLOR,
      cornerRadius: [0, 0, NODE_RADIUS, NODE_RADIUS],
    });

    this.add(headerRect, text, this.icon, bodyContainer);
  }
}
