import Konva from 'konva';
import { Position } from '../../../store/boardStore/node/type';

export class Bezier extends Konva.Line {
  constructor(
    public inputNodeId?: string,
    public outputNodeId?: string,
    options?: Konva.LineConfig
  ) {
    super({
      strokeWidth: 2,
      lineCap: 'round',
      lineJoin: 'round',
      tension: 0, // tension을 0으로 설정하여 제어점 직접 사용
      bezier: true, // 베지에 곡선 사용,
      hitStrokeWidth: 10,
      ...options,
    });
  }

  updateBezierCurve = (
    startPos: Position,
    endPos: Position,
    waveHeight = 50
  ) => {
    // 제어점 위치 조정 (파도 높이 포함)
    const disX = endPos.x - startPos.x;
    const disY = endPos.y - startPos.y;

    // 파도 높이 조정 (중간 제어점의 Y 값을 파도 높이로 조정)
    const controlX1 = startPos.x + disX / 3;
    const controlY1 = startPos.y + disY / 3 - waveHeight;

    const controlX2 = endPos.x - disX / 3;
    const controlY2 = endPos.y - disY / 3 + waveHeight;

    this.points([
      startPos.x,
      startPos.y,
      controlX1,
      controlY1,
      controlX2,
      controlY2,
      endPos.x,
      endPos.y,
    ]);
  };
}
