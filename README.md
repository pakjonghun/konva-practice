- node view model 구조 다듬기. v 1개 vm 1개 모델은 기능단위로 알아서
- 노드 자료구조 json 으로 넣고 노드 모양 만들기
- 핀에 클릭, 연결 베지에 곡선 생성 이벤트 넣기
- 연결 상태와 베지에 곡선 뷰 연결하기
- 각 클레스 별로 노드 하나씩 옮기기

2. 레벨 클리핑 (Layer Clipping)

보이지 않는 영역에 있는 객체들은 다시 그릴 필요가 없습니다. 따라서 캔버스의 보이는 영역만 그리도록 레이어 클리핑을 설정할 수 있습니다. 이렇게 하면 성능을 더 개선할 수 있습니다.

staticLayer.clip({
x: 0,
y: 0,
width: window.innerWidth,
height: window.innerHeight,
});

3. 레이어의 필요 없는 요소 처리

패닝할 때 자주 업데이트되는 동적 레이어에 필요 없는 요소가 포함되어 있으면 성능에 영향을 줄 수 있습니다. 자주 업데이트되지 않는 요소는 정적 레이어에 배치하고, 패닝 중에 동적 레이어의 객체 수를 최소화하는 것이 좋습니다.

4. 레이트 리미터 사용

레이트 리미터를 사용하여 이벤트가 너무 자주 발생하는 것을 방지할 수 있습니다. 드래그 이벤트가 너무 자주 발생하면 성능에 영향을 줄 수 있으므로, requestAnimationFrame이나 throttle 등을 사용해 드래그 이벤트의 빈도를 조절할 수 있습니다.

let lastTime = 0;
const throttle = 100; // 100ms에 한 번만 이벤트 처리

stage.on('dragmove', () => {
const currentTime = new Date().getTime();
if (currentTime - lastTime < throttle) return;

lastTime = currentTime;

const pos = stage.position();
staticLayer.position({ x: pos.x, y: pos.y });
dynamicLayer.position({ x: pos.x, y: pos.y });
});

## to pdf

```
  https://konvajs.org/docs/sandbox/Canvas_to_PDF.html
```

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
