import Konva from 'konva';
import { BACKGROUND, GRID_COLOR, GRID_SIZE } from '../../constants/canvas';
import { BaseLayer } from '../base/baseLayer';
import { Size } from '../../store/logicStore/types/common';

export class BackgroundLayer extends BaseLayer {
  backgroundRect: Konva.Rect;

  constructor(config?: Konva.LayerConfig) {
    super({ ...config });
    const width = config?.width ?? 0;
    const height = config?.height ?? 0;
    this.backgroundRect = this.drawBackground({ width, height });
  }

  smallGrid = (gridSize: number) => {
    const gridCanvas = document.createElement('canvas') as HTMLCanvasElement;
    gridCanvas.width = gridSize;
    gridCanvas.height = gridSize;
    const gridContext = gridCanvas.getContext('2d')!;
    gridContext.strokeStyle = GRID_COLOR;
    gridContext.lineWidth = 1;
    gridContext.beginPath();
    gridContext.moveTo(0, 0);
    gridContext.lineTo(0, gridSize);
    gridContext.lineTo(gridSize, gridSize);
    gridContext.lineTo(gridSize, 0);
    gridContext.closePath();
    gridContext.stroke();

    const imgSrc = gridCanvas.toDataURL();
    const img = new Image();
    img.src = imgSrc;

    return img;
  };

  drawBackground({ width, height }: Size) {
    const grid = this.smallGrid(GRID_SIZE);
    const background = new Konva.Rect({
      id: BACKGROUND,
      x: 0,
      y: 0,
      width,
      height,
      stroke: 'blue',
      strokeWidth: 10,
    });
    this.add(background);

    grid.onload = () => {
      background.fillPatternImage(grid);
      background.fillPatternRepeat('repeat');
    };

    return background;
  }
}
