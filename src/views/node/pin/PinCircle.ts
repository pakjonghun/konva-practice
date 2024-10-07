import Konva from 'konva';
import {
  NODE_BODY_FILL_COLOR,
  NODE_STROKE_COLOR,
} from '../../../constants/canvas';
import { BaseCircle } from '../../base/BaseCircle';

export class PinCircle extends Konva.Group {
  outerCircle: BaseCircle;
  innerCircle: BaseCircle;

  constructor(options: Konva.CircleConfig) {
    super();

    this.outerCircle = new BaseCircle({
      ...options,
      hitStrokeWidth: 20,
      fill: NODE_BODY_FILL_COLOR,
      stroke: options.color,
      strokeWidth: 20,
    });
    const outerRadius = options?.radius ?? 0;
    const innerRadius = outerRadius * 0.6;

    this.innerCircle = new BaseCircle({
      ...options,
      radius: innerRadius,
    });

    this.add(this.outerCircle, this.innerCircle);
  }
}
