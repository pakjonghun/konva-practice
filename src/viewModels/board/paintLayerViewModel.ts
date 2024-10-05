import { BaseLayer } from '../../views/base/BaseLayer';
import { NodeViewModel } from '../node/nodeViewModel';
import { BaseViewModel } from '../base/baseViewModel';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';
import { PAINT } from '../../constants/canvas';
import { NodeData, Size } from '../../store/boardStore/node/type';
import { autorun } from 'mobx';
import { nodeStore } from '../../store/boardStore/node/nodeStore';

export class PaintLayerViewModel extends BaseViewModel {
  private view: Layer;
  private stage: Stage;
  dispose: () => void;

  constructor({ stage, width, height }: Size & { stage: Stage }) {
    super();
    this.stage = stage;

    this.view = new BaseLayer({
      name: PAINT,
      x: 0,
      y: 0,
      width,
      height,
    });

    this.dispose = this.paint();
  }

  bindingNodeUI = (nodeDataList: NodeData[]) => {
    nodeDataList.forEach((nodeData) => {
      // new NodeViewModel(this.view, nodeData);
    });
  };

  paint() {
    const container = this.stage.container();
    container.tabIndex = 1;
    container.focus();

    // const boardData = useLogicStore.getState().nodeById;
    // this.bindingNodeUI(boardData?. ?? []);
    this.stage.batchDraw();

    const dispose = autorun(() => {
      const nodeList = nodeStore.requireNodeUIList;
      nodeList.forEach((nodeData) => {
        new NodeViewModel(this.paintLayer, nodeData);
      });
    });

    return dispose;
  }

  get paintLayer() {
    return this.view;
  }

  get boardId() {
    return this.stage.id();
  }
}
