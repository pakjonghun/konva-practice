import Konva from 'konva';

export class Bezier extends Konva.Line {
  constructor(options?: Konva.LineConfig) {
    super({
      strokeWidth: 2,
      lineCap: 'round',
      lineJoin: 'round',
      tension: 0, // tension을 0으로 설정하여 제어점 직접 사용
      bezier: true, // 베지에 곡선 사용
      ...options,
    });
  }
}
