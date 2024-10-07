import Konva from 'konva';
import { NODE_BODY_FILL_COLOR, NODE_STROKE_COLOR } from '../../../constants/canvas';

export class PinCircle extends Konva.Circle {
  // outerCircle: BaseCircle;
  // innerCircle: BaseCircle;

  constructor(options: Konva.CircleConfig) {
    super({
      ...options,
      hitStrokeWidth: 20,
      fill: 'transparent',
      strokeWidth: 3,
    });

    // this.outerCircle = new BaseCircle({
    //   ...options,
    //   hitStrokeWidth: 20,
    //   fill: NODE_BODY_FILL_COLOR,
    //   strokeWidth: 1.8,
    // });
    // const outerRadius = options?.radius ?? 0;
    // const innerRadius = outerRadius * 0.6;

    // this.innerCircle = new BaseCircle({
    //   ...options,
    //   radius: innerRadius,
    // });

    // this.add(this.outerCircle, this.innerCircle);
  }
}
