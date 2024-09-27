import Konva from 'konva';
import { usePositionStore } from '../store/nodeStore/positionStore';
import { Position } from '../store/nodeStore/types';
import { BaseLayer } from '../views/base/BaseLayer';
import { CustomRectangle } from '../views/ConvaObjects';

export class NodeViewModel {
  private layer: BaseLayer;
  private customRectangle: CustomRectangle;

  constructor(layer: Konva.Layer) {
    this.layer = layer;
    const stage = layer.getStage();
    const title = usePositionStore.getState().title;

    const customRectangle = this.createNode(title, { x: stage.x(), y: stage.y() });
    this.customRectangle = customRectangle;
    this.layer.add(customRectangle);

    this.render();
  }

  createNode(title: string, { x, y }: Position) {
    return new CustomRectangle(
      {
        x,
        y,
        width: 300,
        height: 200,
        draggable: true,
      },
      title
    );
  }

  render() {
    const unsubscribeTitle = usePositionStore.subscribe(
      (state) => state.title,
      (title) => {
        this.customRectangle.updateHeaderText(title);
        this.layer.batchDraw();
      },
      { equalityFn: (a, b) => a == b }
    );

    this.layer.batchDraw();

    return () => {
      unsubscribeTitle();
    };
  }
}
