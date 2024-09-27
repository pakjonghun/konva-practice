import Konva from 'konva';
import { usePositionStore } from '../../store/nodeStore/positionStore';

export abstract class BaseViewModel {
  protected abstract layer: Konva.Layer;
  protected animationFrameId: null | number = null;

  scheduleBatchDraw() {
    if (!this.animationFrameId) {
      this.animationFrameId = requestAnimationFrame(() => {
        this.layer.batchDraw();

        this.animationFrameId = null;
        usePositionStore.getState().increaseRenderCount();
      });
    }
  }
}
