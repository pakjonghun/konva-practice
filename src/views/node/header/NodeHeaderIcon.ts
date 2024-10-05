import Konva from 'konva';
import { NODE_HEADER_HEIGHT, NODE_ICON_SIZE } from '../../../constants/canvas';
import { BaseImage } from '../../base/BaseImage';

export class NodeHeaderIcon extends BaseImage {
  constructor(image: HTMLImageElement, option?: Konva.ImageConfig) {
    super({
      ...option,
      x: 5,
      y: NODE_HEADER_HEIGHT / 2 - NODE_ICON_SIZE / 2,
      width: NODE_ICON_SIZE,
      height: NODE_ICON_SIZE,
      image,
    });

    image.onload = () => {
      this.image(image);
      this.getLayer()?.batchDraw();
    };
  }

  setNewImage(newImage: HTMLImageElement) {
    newImage.onload = () => {
      this.image(newImage);
      this.getLayer()?.batchDraw();
    };
  }
}
