import { BaseLayer } from "../../views/base/BaseLayer";
import { NodeViewModel } from "../node/nodeViewModel";
import { BaseViewModel } from "../base/baseViewModel";
import { Layer } from "konva/lib/Layer";
import { Stage } from "konva/lib/Stage";
import { PAINT } from "../../constants/canvas";
import { Size } from "../../store/logicStore/types/common";
import { useLogicStore } from "../../store/logicStore/logicStore";
import { NodeData } from "../../store/logicStore/types/node";

export class PaintLayerViewModel extends BaseViewModel {
  private view: Layer;
  private stage: Stage;
  dispose: () => void;

  constructor({ stage, width, height }: Size & { stage: Stage }) {
    super();
    this.stage = stage;

    this.view = new BaseLayer({
      name: PAINT,
      x: 0,
      y: 0,
      width,
      height,
    });

    this.dispose = this.paint();
  }

  bindingNodeUI = (nodeDataList: NodeData[]) => {
    nodeDataList.forEach((nodeData) => {
      // new NodeViewModel(this.view, nodeData);
    });
  };

  paint() {
    const container = this.stage.container();
    container.tabIndex = 1;
    container.focus();

    const unsubscribe = useLogicStore.subscribe(
      (state) => {
        // const paintNodeList = [];
        // state.nodeById.forEach((node) => {
        //   if (!node.hasView) {
        //     paintNodeList.push(node);
        //   }
        // });
        // return paintNodeList;
      },
      (boardData) => {
        console.log("boardData", boardData);
        // this.bindingNodeUI();
      },
      { equalityFn: (a, b) => a === b }
    );

    const boardData = useLogicStore.getState().nodeById;
    console.log("iniboardData : ", boardData);
    // this.bindingNodeUI(boardData?. ?? []);
    this.stage.batchDraw();

    return () => {
      unsubscribe();
    };
  }

  get paintLayer() {
    return this.view;
  }

  get boardId() {
    return this.stage.id();
  }
}

