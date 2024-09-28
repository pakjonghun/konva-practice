import Konva from 'konva';
import { BaseRect } from './base/baseRect';
import { BaseText } from './base/baseText';

// Stage 서브클래싱
export class CustomStage extends Konva.Stage {
  constructor(config: Konva.StageConfig) {
    super(config);
  }
}

export class BackgroundLayer extends Konva.Layer {
  constructor(config?: Konva.LayerConfig) {
    super(config);
    this.drawBackground();
  }

  drawBackground() {
    const width = this.width();
    const height = this.height();
    const gridSize = 20;

    const background = new Konva.Rect({
      x: 0,
      y: 0,
      width: width,
      height: height,
      fill: 'black',
    });
    this.add(background);

    // 격자 선을 그리기 위한 배열
    const lines: Konva.Line[] = [];

    // 수직선 그리기
    for (let x = 0; x <= width; x += gridSize) {
      const line = new Konva.Line({
        points: [x, 0, x, height],
        stroke: 'gray',
        strokeWidth: 0.5,
      });
      lines.push(line);
    }

    // 수평선 그리기
    for (let y = 0; y <= height; y += gridSize) {
      const line = new Konva.Line({
        points: [0, y, width, y],
        stroke: 'gray',
        strokeWidth: 0.5,
      });
      lines.push(line);
    }

    // 모든 선을 레이어에 추가
    lines.forEach((line) => this.add(line));

    this.batchDraw(); // 성능을 위해 한 번에 레이어 렌더링
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

// Layer 서브클래싱
export class CustomLayer extends Konva.Layer {}

export class CustomRectangle extends Konva.Group {
  private headerRect: Konva.Rect;
  private headerText: Konva.Text;
  private headerIcon: Konva.Path;
  private bodyRect: Konva.Rect;

  constructor(config: Konva.ContainerConfig, headerText: string) {
    super(config);

    // 헤더 사각형과 텍스트
    this.headerRect = new Konva.Rect({
      x: 0,
      y: 0,
      width: config.width || 0,
      height: 50,
      fill: 'lightgray',
      stroke: 'black',
      strokeWidth: 2,
    });

    this.headerText = new BaseText({
      x: 10,
      y: 10,
      text: headerText,
      fontSize: 20,
      fontStyle: 'bold',
      id: 'text',
    });

    this.headerIcon = new Konva.Path({
      x: 150,
      y: 10,
      data: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z', // 기본 아이콘, 필요시 수정 가능
      fill: 'black',
      scaleX: 1.5,
      scaleY: 1.5,
    });

    // 바디 사각형
    this.bodyRect = new Konva.Rect({
      x: 0,
      y: 50,
      width: config.width || 0,
      height: (config.height || 0) - 50,
      fill: 'white',
      stroke: 'black',
      strokeWidth: 2,
    });

    this.add(this.headerRect, this.headerText, this.headerIcon, this.bodyRect);
  }

  updateHeaderText(newText: string): void {
    this.headerText.text(newText);
  }
}
