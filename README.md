## 기타 성능

- draw layer : shape.moveTo(layer)
- bg layer
- cache() method

## index.html

```
   <!--//konva 최적화-->

    <meta
      name="viewport"
      content="width=device-width, initial-scale=1 user-scalable=no"
    />
```

## base shape

```
import Konva from 'konva';

export class BaseCircle extends Konva.Circle {
  constructor(config: Konva.CircleConfig) {
    super({
      ...config,
      listening: false,
      perfectDrawEnabled: false,
      shadowForStrokeEnabled: false,
    });
  }
}


```

## base stage

```
import Konva from 'konva';

export class BaseStage extends Konva.Stage {
  constructor(config: Konva.StageConfig) {
    super(config);
    Konva.pixelRatio = 1;
  }
}
```

## shape

- moveTo(layer, group 다 됨 ㅋㅋ)
- z-index
  ```
    https://konvajs.org/docs/groups_and_layers/zIndex.html <-- detail>
    yellowBox.moveToTop();
    yellowBox.moveToBottom();
    yellowBox.moveUp();
    yellowBox.moveDown();
    yellowBox.setZIndex(3);
  ```
- multi select

  ```
     resizeEnabled: false,

    basic : https://konvajs.org/docs/select_and_transform/Basic_demo.html
    styling : https://konvajs.org/docs/select_and_transform/Transformer_Complex_Styling.html
  ```

- event listen setting : drawHit()!!!!

```
   oval.listening(false);
          layer.drawHit();
```

-keydown : 오직 캔버스 parent 에 키 이벤트를 걸고, focus 일때만 작동

```
    var container = stage.container();
    container.tabIndex = 1;
    container.focus()
    container.blur()
```

- event width : 쉽게 클릭 가능
  ```
    hitStrokeWidth: 20,
  ```
- cornerRadius
- 성능 line > path
- 베지에 구현 가능 path
- 포인터 3종셋 label > tab > text https://konvajs.org/docs/shapes/Label.html
- image : cache 필수

```
      // main API:
      var imageObj = new Image();
      imageObj.onload = function () {
        var yoda = new Konva.Image({
          x: 50,
          y: 50,
          image: imageObj,
          width: 106,
          height: 118,
        });

        // add the shape to the layer
        yoda.cache()
        layer.add(yoda);
      };
      imageObj.src = '/assets/yoda.jpg';
```

- visible : 사라지고 이벤트도 먹통됨

```
  var pentagon = new Konva.RegularPolygon({
        x: stage.width() / 2,
        y: stage.height() / 2,
        sides: 5,
        radius: 70,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 4,
        visible: false,
      });
      pentagon.show();
      pentagon.hide();
```

- cursor

```
      shape1.on('mouseenter', function () {
        stage.container().style.cursor = 'pointer';
      });

      shape1.on('mouseleave', function () {
        stage.container().style.cursor = 'default';
      });

      shape2.on('mouseenter', function () {
        stage.container().style.cursor = 'move';
      });

      shape2.on('mouseleave', function () {
        stage.container().style.cursor = 'default';
      });

      shape3.on('mouseenter', function () {
        stage.container().style.cursor = 'crosshair';
      });

      shape3.on('mouseleave', function () {
        stage.container().style.cursor = 'default';
      });
```

- 오버렙 될경우 처리

```
 var rect = new Konva.Rect({
        x: 50,
        y: 50,
        // stroke: 'red',
        width: 100,
        height: 100,
        fill: 'red',
        draggable: true,
        globalCompositeOperation: 'xor',
      });
      source-over (기본값) : 새로 그린 도형이 기존 내용 위에 겹쳐서 그려집니다. 투명도가 없으면 기존 내용을 덮어씁니다.
```

- event 테블릿 에서 사용가능하려면 아래 이벤트 써야함.

```
Pointer events: pointerdown, pointermove, pointereup, pointercancel, pointerover, pointerenter, pointerout,pointerleave, pointerclick, pointerdblclick.
```

- all event off

```
shape.off() //test need
shape.off('click') //only click
```
