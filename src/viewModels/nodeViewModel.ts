import Konva from 'konva';
import { usePositionStore } from '../store/nodeStore/positionStore';
import { Position } from '../store/nodeStore/types';
import { BaseLayer } from '../views/base/baseLayer';
import { CustomRectangle } from '../views/ConvaObjects';
import { DRAG, PAINT, TRANSFORMER_RECT } from '../constants/canvas';

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
    this.addEventList();
    this.render();
  }

  addEventList() {
    this.customRectangle.on('dragmove', () => {
      const nextLayer = this.findLayerById(DRAG);
      const tr = this.findLayerById(TRANSFORMER_RECT);
      if (!nextLayer || !tr) {
        return;
      }
      this.customRectangle.moveTo(nextLayer);
      tr.moveTo(nextLayer);
    });

    this.customRectangle.on('dragend', () => {
      const nextLayer = this.findLayerById(PAINT);
      const tr = this.findLayerById(TRANSFORMER_RECT);
      if (!nextLayer || !tr) {
        return;
      }
      this.customRectangle.moveTo(nextLayer);
      tr.moveTo(nextLayer);
    });
  }

  createNode(title: string, { x, y }: Position) {
    return new CustomRectangle(
      {
        id: 'node',
        x,
        y,
        width: 300,
        height: 200,
        draggable: true,
      },
      title
    );
  }

  private findLayerById(id: string) {
    const stage = this.customRectangle.getStage();
    const targetLayer = stage?.findOne(`#${id}`);
    return targetLayer;
  }

  render() {
    const unsubscribeTitle = usePositionStore.subscribe(
      (state) => state.title,
      (title) => {
        this.customRectangle.updateHeaderText(title);
        this.layer.batchDraw();
      },
      { equalityFn: (a, b) => a === b }
    );

    this.layer.batchDraw();

    return () => {
      unsubscribeTitle();
    };
  }
}
