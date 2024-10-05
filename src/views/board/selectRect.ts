import {
  SELECT_COLOR,
  SELECT_RECT,
  SELECT_STROKE_COLOR,
} from "../../constants/canvas";
import { BaseRect } from "../base/BaseRect";

export class SelectRect extends BaseRect {
  constructor() {
    super({
      name: SELECT_RECT,
      fill: SELECT_COLOR,
      strokeWidth: 1,
      stroke: SELECT_STROKE_COLOR,
      visible: false,
    });
  }
}

