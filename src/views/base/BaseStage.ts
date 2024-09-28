import Konva from 'konva';

export class BaseStage extends Konva.Stage {
  constructor(config: Konva.StageConfig) {
    super({ ...config });
    Konva.pixelRatio = 1;
  }
}
