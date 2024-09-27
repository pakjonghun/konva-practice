import Konva from 'konva';
import { usePositionStore } from '../../store/nodeStore/positionStore';

//캔버스를 만들고 캔버스 레이어 관리
//새로운 노드 뷰모델을 만든다.

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
