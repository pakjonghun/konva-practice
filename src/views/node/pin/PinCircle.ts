import Konva from 'konva';
import { NODE_BODY_FILL_COLOR, NODE_STROKE_COLOR } from '../../../constants/canvas';

export class PinCircle extends Konva.Circle {
  constructor(options?: Konva.CircleConfig) {
    super({
      ...options,
      fill: NODE_BODY_FILL_COLOR,
      stroke: NODE_STROKE_COLOR,
      strokeWidth: 1.4,
    });
  }
}
