import Konva from 'konva';
import { BaseImage } from '../../base/BaseImage';

export class PinIcon extends BaseImage {
  constructor(image: HTMLImageElement, option?: Konva.ImageConfig) {
    super({
      ...option,
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
