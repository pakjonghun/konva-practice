import Konva from 'konva';

export class BackgroundLayer extends Konva.Layer {
  constructor(config?: Konva.LayerConfig) {
    super(config);
    this.drawBackground();
  }

  drawBackground() {
    const width = 2000;
    const height = 2000;
    const gridSize = 50;

    const background = new Konva.Rect({
      x: 0,
      y: 0,
      width,
      height,
      fill: 'black',
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
  }

  background() {
    const width = this.width();
    const height = this.height();
    const gridSize = 20;

    const ctx = this.getContext();

    ctx.rect(0, 0, width, height);
    ctx.fillStyle = 'black';
    ctx.fill();

    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 0.5;

    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }
}
