import Konva from 'konva';

export class BaseLayer extends Konva.Layer {
  constructor(config?: Konva.LayerConfig) {
    super({ ...config });
  }
}
