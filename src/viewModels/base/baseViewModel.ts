import Konva from 'konva';
import { useBoardStore } from '../../store/boardStore/boardStore';

export abstract class BaseViewModel {
  protected animationFrameId: null | number = null;

  scheduleBatchDraw(layer: Konva.Layer) {
    if (!this.animationFrameId) {
      this.animationFrameId = requestAnimationFrame(() => {
        layer.batchDraw();

        this.animationFrameId = null;
        useBoardStore.getState().increaseRenderCount();
      });
    }
  }
}
