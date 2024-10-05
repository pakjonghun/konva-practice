import Konva from 'konva';
import {
  NODE_FILL_COLOR,
  NODE_HEADER_HEIGHT,
  NODE_RADIUS,
  NODE_STROKE_COLOR,
  NODE_WIDTH,
} from '../../../constants/canvas';
import { BaseRect } from '../../base/BaseRect';

export class NodeHeader extends BaseRect {
  constructor(option?: Konva.GroupConfig) {
    super({
      ...option,
      x: 0,
      y: 0,
      stroke: NODE_STROKE_COLOR,
      width: NODE_WIDTH,
      height: NODE_HEADER_HEIGHT,
      fill: NODE_FILL_COLOR,
      cornerRadius: [NODE_RADIUS, NODE_RADIUS, 0, 0],
    });
  }
}
