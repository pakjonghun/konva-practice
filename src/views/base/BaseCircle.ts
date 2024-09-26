import Konva from 'konva';

export class BaseCircle extends Konva.Circle {
  constructor(config: Konva.CircleConfig) {
    super({
      ...config,
      listening: false,
      perfectDrawEnabled: false,
      shadowForStrokeEnabled: false,
    });
  }
}
