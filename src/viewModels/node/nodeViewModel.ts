import Konva from 'konva';
import { NodeData } from '../../store/boardStore/node/type';
import { DRAG, NODE_TAG, PAINT, TRANSFORMER_RECT } from '../../constants/canvas';
import { NodeUI } from '../../views/node/NodeUI';
import { reaction } from 'mobx';
import { nodeStore } from '../../store/boardStore/node/nodeStore';
import { PinViewModel } from './pinViewModel';
import { Bezier } from '../../views/node/line/bezier';
import { Layer } from 'konva/lib/Layer';
import { pinIdByConnect } from '../../store/boardStore/node/utils';
import { PinUI } from '../../views/node/pin/PinUI';

export class NodeViewModel {
  layer: Konva.Layer;
  view: NodeUI;
  dispose: () => void;
  nodeId: string;

  constructor(layer: Konva.Layer, nodeData: NodeData) {
    this.layer = layer;
    const view = this.createNode(nodeData);
    this.view = view;

    this.nodeId = nodeData.id;

    this.dispose = this.render();

    reaction(
      () => {
        return nodeStore.nodeItemStore.title(this.nodeId);
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

      // const nodeData = nodeStore.getTargetNodeData(this.nodeId);
      // nodeData.nodeData.components.forEach(c=>{
      //   c.id
      // })
      const lines = this.layer.find('Line') as Bezier[];

      lines.forEach((l) => {
        l.moveTo(dragLayer);
      });
      tr.moveTo(dragLayer);
    });

    this.view.on('dragmove', (event) => {
      const dragLayer = this.findByName(DRAG) as Layer;
      const stage = event.target.getStage();
      if (!stage) {
        return;
      }

      const lines = (dragLayer as Layer)?.find('Line') as Bezier[];
      lines.forEach((line) => {
        const cId = line.id();
        const { from, to } = pinIdByConnect(cId);
        const fromPin = stage.findOne(`#${from}`) as PinUI;
        const toPin = stage.findOne(`#${to}`) as PinUI;

        if (!fromPin || !toPin) {
          console.log('no pin found');
          return;
        }

        const fromPos = fromPin.circle.getAbsolutePosition();
        const toPos = toPin.circle.getAbsolutePosition();
        if (!fromPos || !toPos) return;

        line.updateBezierCurve(fromPos, toPos);
      });
    });

    this.view.on('dragend', () => {
      const dragLayer = this.findByName(DRAG);
      const paintLayer = this.findByName(PAINT);
      const tr = this.findByName(TRANSFORMER_RECT);
      if (!paintLayer || !tr) {
        return;
      }

      const lines = (dragLayer as Layer)?.find('Line') as Bezier[];
      this.view.moveTo(paintLayer);
      lines.forEach((l) => {
        l.moveTo(paintLayer);
      });
      tr.moveTo(paintLayer);

      nodeStore.nodeItemStore.setPosition(this.nodeId, this.view.position());
    });

    return () => {
      this.view.off('dragstart');
      this.view.off('dragend');
    };
  }

  createNode(nodeData: NodeData) {
    const { x, y } = nodeData.initPosition;
    const nodeUI = new NodeUI(nodeData, {
      name: NODE_TAG,
      id: nodeData.id,
      x,
      y,
      draggable: true,
      listening: true,
    });
    this.layer.add(nodeUI);

    return nodeUI;
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
