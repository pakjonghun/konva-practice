import { BaseLayer } from '../views/base/BaseLayer';
import { NodeViewModel } from './nodeViewModel';
import { BaseStage } from '../views/base/BaseStage';
import { BaseViewModel } from './base/baseViewModel';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';
import { BackgroundLayer } from '../views/static/backgroundLayer';
import { usePositionStore } from '../store/nodeStore/positionStore';

//캔버스를 만들고 캔버스 레이어 관리
//새로운 노드 뷰모델을 만든다.

export class CanvasViewModel extends BaseViewModel {
  private stage: Stage;
  protected paintLayer: Layer;
  private backgroundLayer: BackgroundLayer;

  constructor({
    container,
    width,
    height,
  }: {
    container: HTMLDivElement;
    width: number;
    height: number;
  }) {
    super();
    const stage = new BaseStage({
      container,
      width,
      height,
      draggable: true,
    });
    const centerX = stage.width() / 2;
    const centerY = stage.height() / 2;

    const layerConfig = {
      x: 0,
      y: 0,
      width,
      height,
    };

    const paintLayer = new BaseLayer(layerConfig);
    const backgroundLayer = new BackgroundLayer(layerConfig);
    stage.add(backgroundLayer, paintLayer);

    this.stage = stage;
    this.paintLayer = paintLayer;
    this.backgroundLayer = backgroundLayer;
  }

  bindingNodeUI = (count: number) => {
    for (let i = 0; i < count; i++) {
      new NodeViewModel(this.paintLayer);
    }
  };

  render() {
    this.stage.on('dragmove', () => {
      const { x, y } = this.stage.position();
      const width = this.stage.width();
      const height = this.stage.height();

      const prevX = this.backgroundLayer.x();
      const prevY = this.backgroundLayer.y();
      const background = this.backgroundLayer.position({ x: prevX + x, y: prevY + y });

      console.log(x, y);
    });

    const unsubscribe = usePositionStore.subscribe(
      (state) => state.count,
      (count) => {
        this.bindingNodeUI(count);
      },
      { equalityFn: (a, b) => a == b }
    );

    const count = usePositionStore.getState().count;
    this.bindingNodeUI(count);
    this.scheduleBatchDraw();

    return () => {
      unsubscribe();
    };
  }
}
