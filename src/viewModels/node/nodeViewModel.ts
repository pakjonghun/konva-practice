export class NodeViewModel {
  // constructor(layer: Konva.Layer) {
  //   this.layer = layer;
  //   // const logicById = useLogicStore.getState().logicById.get('');
  //   const customRectangle = this.createNode('a', {
  //     x: layer.x(),
  //     y: layer.y(),
  //   });
  //   this.customRectangle = customRectangle;
  //   this.layer.add(customRectangle);
  //   this.addEventList();
  //   this.render();
  // }
  // addEventList() {
  //   this.customRectangle.on('dragmove', () => {
  //     const nextLayer = this.findLayerById(DRAG);
  //     const tr = this.findLayerById(TRANSFORMER_RECT);
  //     if (!nextLayer || !tr) {
  //       return;
  //     }
  //     this.customRectangle.moveTo(nextLayer);
  //     tr.moveTo(nextLayer);
  //   });
  //   this.customRectangle.on('dragend', () => {
  //     const nextLayer = this.findLayerById(PAINT);
  //     const tr = this.findLayerById(TRANSFORMER_RECT);
  //     if (!nextLayer || !tr) {
  //       return;
  //     }
  //     this.customRectangle.moveTo(nextLayer);
  //     tr.moveTo(nextLayer);
  //   });
  // }
  // createNode(title: string, { x, y }: Position) {
  //   return new CustomRectangle(
  //     {
  //       id: 'node',
  //       x,
  //       y,
  //       width: 300,
  //       height: 200,
  //       draggable: true,
  //     },
  //     title
  //   );
  // }
  // private findLayerById(tag: string) {
  //   const stage = this.customRectangle.getStage();
  //   const targetLayer = stage?.findOne(`.${tag}`);
  //   return targetLayer;
  // }
  // render() {
  //   // const unsubscribeTitle = useBoardStore.subscribe(
  //   //   (state) => state.title,
  //   //   (title) => {
  //   //     this.customRectangle.updateHeaderText(title);
  //   //     this.layer.batchDraw();
  //   //   },
  //   //   { equalityFn: (a, b) => a === b }
  //   // );
  //   this.layer.batchDraw();
  //   return () => {
  //     // unsubscribeTitle();
  //   };
  // }
}
