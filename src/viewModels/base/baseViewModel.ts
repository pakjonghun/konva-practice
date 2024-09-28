import Konva from 'konva';
import { usePositionStore } from '../../store/nodeStore/positionStore';

export abstract class BaseViewModel {
  protected animationFrameId: null | number = null;

  scheduleBatchDraw(layer: Konva.Layer) {
    if (!this.animationFrameId) {
      this.animationFrameId = requestAnimationFrame(() => {
        layer.batchDraw();

        this.animationFrameId = null;
        usePositionStore.getState().increaseRenderCount();
      });
    }
  }
}
