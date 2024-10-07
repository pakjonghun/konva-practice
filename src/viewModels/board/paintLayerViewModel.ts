import { BaseLayer } from '../../views/base/BaseLayer';
import { NodeViewModel } from '../node/nodeViewModel';
import { BaseViewModel } from '../base/baseViewModel';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';
import { PAINT } from '../../constants/canvas';
import { Size } from '../../store/boardStore/node/type';
import { autorun } from 'mobx';
import { nodeStore } from '../../store/boardStore/node/nodeStore';
import { PinViewModel } from '../node/pinViewModel';
import { connectId } from '../../store/boardStore/node/utils';
import { Bezier } from '../../views/node/line/bezier';
import { LineViewModel } from '../node/lineViewModel';

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

  paint() {
    const container = this.stage.container();
    container.tabIndex = 1;
    container.focus();

    this.stage.batchDraw();
    const nodeDisposeList: (() => void)[] = [];

    const nodeDispose = autorun(() => {
      const nodeList = nodeStore.requireNodeUIList;
      nodeList.forEach((nodeData) => {
        const nodeViewModel = new NodeViewModel(this.paintLayer, nodeData);
        const nodeDispose = nodeViewModel.dispose;

        const components = nodeData.components;
        components.forEach((comp) => {
          if (comp.properties.uses == 'Flow') {
            return;
          } else {
            const pinViewModel = new PinViewModel(this.paintLayer, comp.id, nodeData.id);
          }
        });

        nodeDisposeList.push(nodeDispose);
      });
      nodeStore.batchBindNode(nodeList.map((node) => node.id));
    });

    // const connectionDispose = autorun(() => {
    //   const connectionList = nodeStore.requireConnectionUIList;
    //   console.log('connectionList : ', connectionList);
    //   connectionList.forEach((c) => {
    //     // const bezierLine = new Bezier({
    //     //   id: 'trying',
    //     //   points: [0, 0, 0, 0, 0, 0, 0, 0],
    //     //   stroke: '#000',
    //     // });
    //     // this.paintLayer.add(bezierLine);
    //     // bezierLine.moveToTop();
    //     // const lintVM = new LineViewModel(bezierLine);
    //     // const nodeViewModel = new NodeViewModel(this.paintLayer, c);
    //     // const nodeDispose = nodeViewModel.dispose;
    //   });
    //   // nodeStore.batchBindConnection(connectionList.map((c) => connectId(c)));
    // });

    return () => {
      nodeDispose();
      // connectionDispose();
      nodeDisposeList.forEach((disposeFunc) => disposeFunc());
    };
  }

  get paintLayer() {
    return this.view;
  }

  get boardId() {
    return this.stage.id();
  }
}
