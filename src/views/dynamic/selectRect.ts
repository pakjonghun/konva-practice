import { SELECT_COLOR, SELECT_STROKE_COLOR } from '../../constants/canvas';
import { BaseRect } from '../base/baseRect';

export class SelectRect extends BaseRect {
  constructor() {
    super({
      fill: SELECT_COLOR,
      strokeWidth: 1,
      stroke: SELECT_STROKE_COLOR,
      visible: false,
    });
  }
}
