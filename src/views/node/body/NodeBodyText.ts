import Konva from 'konva';
import { NODE_FONT_SIZE, NODE__HEADER_TEXT_COLOR } from '../../../constants/canvas';
import { BaseText } from '../../base/BaseText';

export class NodeBodyText extends BaseText {
  constructor(text: string, option?: Konva.TextConfig) {
    super({
      fontSize: NODE_FONT_SIZE,
      fill: NODE__HEADER_TEXT_COLOR,
      ...option,
      text,
    });
  }
}
