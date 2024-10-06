import Konva from 'konva';

export class BaseText extends Konva.Text {
  constructor(config: Konva.TextConfig) {
    super({
      ...config,
      listening: false,
      perfectDrawEnabled: false,
      shadowForStrokeEnabled: false,
      fontFamily: 'Helvetica',
    });
  }
}
