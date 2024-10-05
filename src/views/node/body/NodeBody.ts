import Konva from 'konva';
import {
  NODE_BODY_HEIGHT,
  NODE_FILL_COLOR,
  NODE_HEADER_HEIGHT,
  NODE_RADIUS,
  NODE_STROKE_COLOR,
  NODE_WIDTH,
} from '../../../constants/canvas';
import { BaseRect } from '../../base/BaseRect';

export class NodeBody extends BaseRect {
  constructor(option?: Konva.GroupConfig) {
    super({
      ...option,
      x: 0,
      stroke: NODE_STROKE_COLOR,
      y: NODE_HEADER_HEIGHT,
      width: NODE_WIDTH,
      height: NODE_BODY_HEIGHT,
      fill: NODE_FILL_COLOR,
      cornerRadius: [0, 0, NODE_RADIUS, NODE_RADIUS],
    });
  }
}
