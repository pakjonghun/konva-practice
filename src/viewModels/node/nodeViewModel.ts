import Konva from 'konva';
import { NodeData } from '../../store/boardStore/node/type';
import { DRAG, NODE_TAG, PAINT, TRANSFORMER_RECT } from '../../constants/canvas';
import { NodeUI } from '../../views/node/NodeUI';
import { reaction } from 'mobx';
import { nodeStore } from '../../store/boardStore/node/nodeStore';

export class NodeViewModel {
  layer: Konva.Layer;
  view: NodeUI;
  dispose: () => void;
  nodeId: string;

  constructor(layer: Konva.Layer, nodeData: NodeData) {
    this.layer = layer;
    const view = this.createNode(nodeData);
    this.view = view;
    this.layer.add(view);
    this.nodeId = nodeData.id;

    this.dispose = this.render();

    reaction(
      () => {
        return nodeStore.getTargetNodeData(nodeData.id).title;
      },
      (newTitle) => {
        this.updateTitle(newTitle);
      }
    );
  }

  updateTitle = (newTitle: string) => {
    this.view.headerTitle.setText(newTitle);
  };

  addEventList() {
    this.view.on('dragstart', () => {
      const dragLayer = this.findByName(DRAG);
      const tr = this.findByName(TRANSFORMER_RECT);
      if (!dragLayer || !tr) {
        return;
      }

      this.view.moveTo(dragLayer);
      tr.moveTo(dragLayer);
    });
    this.view.on('dragend', () => {
      const paintLayer = this.findByName(PAINT);
      const tr = this.findByName(TRANSFORMER_RECT);
      if (!paintLayer || !tr) {
        return;
      }
      this.view.moveTo(paintLayer);
      tr.moveTo(paintLayer);

      const nodeItemStore = nodeStore.getTargetNodeData(this.nodeId);
      nodeItemStore.setPosition(this.view.position());
    });

    return () => {
      this.view.off('dragstart');
      this.view.off('dragend');
    };
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
  private findByName(tag: string) {
    const stage = this.view.getStage();
    const targetLayer = stage?.findOne(`.${tag}`);
    return targetLayer;
  }
  render() {
    const eventDispose = this.addEventList();
    return eventDispose;
  }
}
