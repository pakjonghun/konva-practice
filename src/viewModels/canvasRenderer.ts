import { CustomRectangle } from '../views/ConvaObjects';
import { usePositionStore } from '../store/nodeStore/positionStore';
import Konva from 'konva';
import { Position } from '../store/nodeStore/types';

export class CanvasRenderer {
  private backgroundLayer: Konva.Layer;
  private paintLayer: Konva.Layer;
  private customRectangle: CustomRectangle;

  constructor(paintLayer: Konva.Layer, backgroundLayer: Konva.Layer) {
    this.paintLayer = paintLayer;
    this.backgroundLayer = backgroundLayer;

    const { x, y, title } = usePositionStore.getState();
    const customRectangle = this.createNode(title, { x, y });
    this.customRectangle = customRectangle;

    this.paintLayer.add(customRectangle);
  }

  createNode(title: string, { x, y }: Position) {
    return new CustomRectangle(
      {
        x: x,
        y: y,
        width: 400,
        height: 300,
        draggable: true,
      },
      title
    );
  }

  render() {
    const unsubscribeTitle = usePositionStore.subscribe(
      (state) => state.title,
      (title) => {
        console.log('title', title);
        this.customRectangle.updateHeaderText(title);
      },
      { equalityFn: (a, b) => a == b }
    );

    const unsubscribeCount = usePositionStore.subscribe((state) => {
      console.log('count', state.count);
      this.customRectangle.updateHeaderText(state.count.toString());
      // this.paintLayer.destroyChildren();
      // this.paintLayer.batchDraw();
      // this.customRectangle.updateHeaderText(state.title);
    });

    const unsubscribePosition = usePositionStore.subscribe(
      (state) => ({ x: state.x, y: state.y }),
      (position) => {
        console.log('position', position);
      },
      { equalityFn: (a, b) => a.x == b.x && a.y == b.y }
    );

    this.paintLayer.batchDraw();

    return () => {
      unsubscribeCount();
      unsubscribeTitle();
      unsubscribePosition();
    };
  }
}
