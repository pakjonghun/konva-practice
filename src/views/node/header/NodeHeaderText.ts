import Konva from 'konva';
import {
  NODE_FONT_SIZE,
  NODE_HEADER_HEIGHT,
  NODE__HEADER_TEXT_COLOR,
} from '../../../constants/canvas';
import { BaseText } from '../../base/BaseText';

export class NodeHeaderText extends BaseText {
  constructor(text: string, option?: Konva.TextConfig) {
    super({
      ...option,
      text,
      x: 30,
      fontSize: NODE_FONT_SIZE,
      y: NODE_HEADER_HEIGHT / 2 - NODE_FONT_SIZE / 2,
      fill: NODE__HEADER_TEXT_COLOR,
    });
  }
}
