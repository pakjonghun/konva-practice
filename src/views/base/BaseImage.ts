import Konva from 'konva';

export class BaseImage extends Konva.Image {
  constructor(config: Konva.ImageConfig) {
    super({
      ...config,
      listening: false,
      perfectDrawEnabled: false,
      shadowForStrokeEnabled: false,
    });
  }
}
