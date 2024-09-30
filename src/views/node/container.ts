import { Group } from 'konva/lib/Group';
import { BaseRect } from '../base/BaseRect';
import {
  BODY_TAG,
  CONTAINER_TAG,
  HEADER_TAG,
  NODE_FILL_COLOR,
  NODE_HEADER_HEIGHT,
  NODE_STROKE_COLOR,
  NODE_WIDTH,
} from '../../constants/canvas';

export class Container {
  constructor() {
    this.paint();
  }

  paint() {
    const group = new Group({
      name: CONTAINER_TAG,
    });
    const header = new BaseRect({
      name: HEADER_TAG,
      x: 0,
      y: 0,
      width: NODE_WIDTH,
      height: NODE_HEADER_HEIGHT,
      fill: NODE_FILL_COLOR,
      stroke: NODE_STROKE_COLOR,
    });
    const body = new BaseRect({
      name: BODY_TAG,
      x: 0,
      y: NODE_HEADER_HEIGHT,
      width: NODE_WIDTH,
      height: NODE_HEADER_HEIGHT,
      fill: NODE_FILL_COLOR,
      stroke: NODE_STROKE_COLOR,
    });
    group.add(header, body);
  }
}
