import Konva from 'konva';

export class BaseRect extends Konva.Rect {
  constructor(config: Konva.RectConfig) {
    super({
      ...config,
      listening: false,
      perfectDrawEnabled: false,
      shadowForStrokeEnabled: false,
    });
  }
}
