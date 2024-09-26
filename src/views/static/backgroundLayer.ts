import Konva from 'konva';
import { Size } from '../../store/nodeStore/types';

export class BackgroundLayer extends Konva.Layer {
  backgroundRect: Konva.Rect;

  constructor(config?: Konva.LayerConfig) {
    super({ ...config });
    const width = config?.width ?? 0;
    const height = config?.height ?? 0;
    this.backgroundRect = this.drawBackground({ width, height });
  }

  drawBackground({ width, height }: Size) {
    const gridSize = 50;

    const background = new Konva.Rect({
      x: 0,
      y: 0,
      width,
      height,
      fill: '#2E2E2E',
      stroke: 'blue',
      strokeWidth: 10,
    });
    this.add(background);

    const lines: Konva.Line[] = [];

    for (let x = 0; x <= width; x += gridSize) {
      const line = new Konva.Line({
        points: [x, 0, x, height],
        stroke: 'grey',
        strokeWidth: 1,
      });
      lines.push(line);
    }

    for (let y = 0; y <= height; y += gridSize) {
      const line = new Konva.Line({
        points: [0, y, width, y],
        stroke: 'gray',
        strokeWidth: 1,
      });
      lines.push(line);
    }

    lines.forEach((line) => this.add(line));

    return background;
  }
}
