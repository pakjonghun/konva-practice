import Konva from 'konva';
import { useBoardStore } from '../../store/boardStore/boardStore';
import { Position } from '../../store/boardStore/types';
import { BaseLayer } from '../../views/base/baseLayer';
import { CustomRectangle } from '../../views/ConvaObjects';
import { DRAG, PAINT, TRANSFORMER_RECT } from '../../constants/canvas';
import { useNodeStore } from '../../store/nodeStore/nodeStore';

export class NodeViewModel {
  private layer: BaseLayer;
  private customRectangle: CustomRectangle;

  constructor(layer: Konva.Layer) {
    this.layer = layer;
    const title = useBoardStore.getState().title;

    console.log(useNodeStore.getState().nodeById.size);

    const customRectangle = this.createNode(title, { x: layer.x(), y: layer.y() });
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
    useNodeStore.subscribe(
      (state) => state.nodeById.get('d6fb3640-f7ab-11ee-9afa-dd080d0c217e'),
      (node) => {
        console.log('my node!', node?._id);
        this.customRectangle.updateHeaderText(node?.name ?? '');
      }
    );

    const unsubscribeTitle = useBoardStore.subscribe(
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
