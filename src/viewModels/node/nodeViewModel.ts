import Konva from 'konva';
import { NodeData } from '../../store/boardStore/node/type';
import { DRAG, NODE_TAG, PAINT, TRANSFORMER_RECT } from '../../constants/canvas';
import { NodeUI } from '../../views/node/NodeUI';

export class NodeViewModel {
  layer: Konva.Layer;
  view: Konva.Group;

  constructor(layer: Konva.Layer, nodeData: NodeData) {
    this.layer = layer;
    const view = this.createNode(nodeData);
    this.view = view;
    this.layer.add(view);
    this.addEventList();
    this.render();
  }
  addEventList() {
    this.view.on('mousedown', () => {
      console.log('down');
    });

    this.view.on('dragmove', () => {
      const nextLayer = this.findLayerById(DRAG);
      const tr = this.findLayerById(TRANSFORMER_RECT);
      if (!nextLayer || !tr) {
        return;
      }
      this.view.moveTo(nextLayer);
      tr.moveTo(nextLayer);
    });
    this.view.on('dragend', () => {
      const nextLayer = this.findLayerById(PAINT);
      const tr = this.findLayerById(TRANSFORMER_RECT);
      if (!nextLayer || !tr) {
        return;
      }
      this.view.moveTo(nextLayer);
      tr.moveTo(nextLayer);
    });
  }
  createNode(nodeData: NodeData) {
    const { x, y } = nodeData.initPosition;
    return new NodeUI(nodeData, {
      name: NODE_TAG,
      id: nodeData.id,
      x,
      y,
      draggable: true,
      listening: true,
    });
  }
  private findLayerById(tag: string) {
    const stage = this.view.getStage();
    const targetLayer = stage?.findOne(`.${tag}`);
    return targetLayer;
  }
  render() {
    // const unsubscribeTitle = useBoardStore.subscribe(
    //   (state) => state.title,
    //   (title) => {
    //     this.customRectangle.updateHeaderText(title);
    //     this.layer.batchDraw();
    //   },
    //   { equalityFn: (a, b) => a === b }
    // );
    // this.layer.batchDraw();
    return () => {
      // unsubscribeTitle();
    };
  }
}
