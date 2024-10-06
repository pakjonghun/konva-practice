import Konva from 'konva';
import { BaseText } from '../../base/BaseText';
import { NODE_WIDTH, PIN_HEIGHT } from '../../../constants/canvas';

export class PinText extends BaseText {
  constructor(text: string, option?: Konva.TextConfig) {
    super({
      ...option,
      text,
      fontSize: 15,
      height: PIN_HEIGHT,
      width: NODE_WIDTH / 2,
      verticalAlign: 'middle',
    });
  }
}
