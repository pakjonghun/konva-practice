import Konva from 'konva';
import { Position } from '../../store/nodeStore/types';

export class BaseStage extends Konva.Stage {
  lastCenter: null | Position = null;
  lastDist = 0;
  dragStopped = false;

  constructor(config: Konva.StageConfig) {
    super({ ...config });
    // Konva.hitOnDragEnabled = true;
    Konva.pixelRatio = 1;

    // this.on('touchmove', function (e) {
    //   e.evt.preventDefault();
    //   const touch1 = e.evt.touches[0];
    //   const touch2 = e.evt.touches[1];

    //   if (touch1 && !touch2 && !this.isDragging() && this.dragStopped) {
    //     this.startDrag();
    //     this.dragStopped = false;
    //   }

    //   if (touch1 && touch2) {
    //     if (this.isDragging()) {
    //       this.dragStopped = true;
    //       this.stopDrag();
    //     }

    //     var p1 = {
    //       x: touch1.clientX,
    //       y: touch1.clientY,
    //     };
    //     var p2 = {
    //       x: touch2.clientX,
    //       y: touch2.clientY,
    //     };

    //     if (!this.lastCenter) {
    //       this.lastCenter = this.getCenter(p1, p2);
    //       return;
    //     }
    //     var newCenter = this.getCenter(p1, p2);

    //     var dist = this.getDistance(p1, p2);

    //     if (!this.lastDist) {
    //       this.lastDist = dist;
    //     }

    //     // local coordinates of center point
    //     var pointTo = {
    //       x: (newCenter.x - this.x()) / this.scaleX(),
    //       y: (newCenter.y - this.y()) / this.scaleX(),
    //     };

    //     var scale = this.scaleX() * (dist / this.lastDist);

    //     this.scaleX(scale);
    //     this.scaleY(scale);

    //     // calculate new position of the this
    //     var dx = newCenter.x - this.lastCenter.x;
    //     var dy = newCenter.y - this.lastCenter.y;

    //     var newPos = {
    //       x: newCenter.x - pointTo.x * scale + dx,
    //       y: newCenter.y - pointTo.y * scale + dy,
    //     };

    //     this.position(newPos);

    //     this.lastDist = dist;
    //     this.lastCenter = newCenter;
    //   }
    // });

    this.on('touchend', function (e) {
      this.lastDist = 0;
      this.lastCenter = null;
    });
  }

  // private getDistance(p1: Position, p2: Position) {
  //   return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  // }

  // private getCenter(p1: Position, p2: Position) {
  //   return {
  //     x: (p1.x + p2.x) / 2,
  //     y: (p1.y + p2.y) / 2,
  //   };
  // }
}
