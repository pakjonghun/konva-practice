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

// import Konva from 'konva';
// import { CustomRectangle } from '../views/ConvaObjects';
// import { usePositionStore } from '../store/nodeStore/positionStore';
// import { Position } from '../store/nodeStore/types';
// import { BaseLayer } from '../views/BaseLayer';
// import { NodeViewMdoel } from './nodeViewModel';
// import { BaseStage } from '../views/BaseStage';

// //캔버스를 만들고 캔버스 레이어 관리
// //새로운 노드 뷰모델을 만든다.

// export class CanvasRenderer {
//   private stage: Konva.Stage;
//   private backgroundLayer: Konva.Layer;
//   private paintLayer: Konva.Layer;
//   private layers: Konva.Layer[] = [];
//   private customRectangle: CustomRectangle;
//   private animationFrameId: null | number = null;

//   constructor({
//     container,
//     width,
//     height,
//   }: {
//     container: HTMLDivElement;
//     width: number;
//     height: number;
//   }) {
//     const stage = new BaseStage({
//       container,
//       width,
//       height,
//     });

//     const paintLayer = new BaseLayer();
//     const backgroundLayer = new BaseLayer();

//     this.stage = stage;
//     this.paintLayer = paintLayer;
//     this.backgroundLayer = backgroundLayer;
//     this.nodeViewModel = new NodeViewMdoel(paintLayer);

//     const { x, y, title } = usePositionStore.getState();
//     const customRectangle = this.createNode(title, { x, y });
//     this.customRectangle = customRectangle;
//     this.paintLayer.add(customRectangle);
//   }

//   scheduleBatchDraw() {
//     if (!this.animationFrameId) {
//       this.animationFrameId = requestAnimationFrame(() => {
//         this.paintLayer.batchDraw();

//         this.animationFrameId = null;
//         usePositionStore.getState().increaseRenderCount();
//       });
//     }
//   }

//   createNode(title: string, { x, y }: Position) {
//     return new CustomRectangle(
//       {
//         x: x,
//         y: y,
//         width: 400,
//         height: 300,
//         draggable: true,
//       },
//       title
//     );
//   }

//   render() {
//     const unsubscribeTitle = usePositionStore.subscribe(
//       (state) => state.title,
//       (title) => {
//         this.customRectangle.updateHeaderText(title);
//         this.scheduleBatchDraw();
//       },
//       { equalityFn: (a, b) => a == b }
//     );

//     const unsubscribeCount = usePositionStore.subscribe(
//       (state) => state.count,
//       (count) => {
//         const layerCount = Math.floor(count / 400) - 1;
//         if (layerCount > 0) {
//           this.layers.push(new BaseLayer({}));
//         }

//         this.paintLayer.removeChildren();

//         if (!count) {
//           return;
//         }

//         const nodes = [];
//         for (let i = 0; i < count; i++) {
//           const belowT = Math.random() * 1000;
//           const newC = this.createNode('zz', { x: belowT, y: belowT });
//           nodes.push(newC);
//         }
//         this.paintLayer.add(...nodes);

//         this.scheduleBatchDraw();
//       },
//       {
//         equalityFn: (a, b) => a == b,
//       }
//     );

//     const unsubscribePosition = usePositionStore.subscribe(
//       (state) => ({ x: state.x, y: state.y }),
//       ({ x, y }) => {
//         this.customRectangle.updateHeaderText(`${x}-${y}`);
//         this.scheduleBatchDraw();
//       },
//       { equalityFn: (a, b) => a.x == b.x && a.y == b.y }
//     );

//     this.paintLayer.batchDraw();

//     return () => {
//       unsubscribeCount();
//       unsubscribeTitle();
//       unsubscribePosition();
//     };
//   }
// }
