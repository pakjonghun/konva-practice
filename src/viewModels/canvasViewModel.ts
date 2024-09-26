import Konva from 'konva';
import { BaseLayer } from '../views/base/BaseLayer';
import { NodeViewModel } from './nodeViewModel';
import { BaseStage } from '../views/base/BaseStage';
import { BaseViewModel } from './base/baseViewModel';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';
import { BackgroundLayer } from '../views/static/backgroundLayer';

//캔버스를 만들고 캔버스 레이어 관리
//새로운 노드 뷰모델을 만든다.

export class CanvasViewModel extends BaseViewModel {
  private stage: Stage;
  protected paintLayer: Layer;
  private backgroundLayer: Layer;
  private nodeViewModel: NodeViewModel;

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
    });
    const centerX = stage.width() / 2;
    const centerY = stage.height() / 2;

    const layerConfig = {
      x: -centerX,
      y: -centerY,
      width,
      height,
    };

    const paintLayer = new BaseLayer(layerConfig);
    const backgroundLayer = new BackgroundLayer(layerConfig);
    stage.add(backgroundLayer, paintLayer);

    this.stage = stage;
    this.paintLayer = paintLayer;
    this.backgroundLayer = backgroundLayer;
    this.nodeViewModel = new NodeViewModel(paintLayer);
    this.render();
  }

  bindingNodeUI = () => {};

  render() {
    this.bindingNodeUI();
    this.scheduleBatchDraw();
  }

  destroy() {
    //
  }
}
