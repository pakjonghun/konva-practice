import { PinStore } from './pinStore';
import { ComponentCommon, NodeData, NodeDataView, Position } from './type';
import { makeAutoObservable } from 'mobx';

export class NodeItemStore {
  nodeData: NodeDataView;

  constructor(nodeData: NodeData) {
    makeAutoObservable(this);
    this.nodeData = this.initNodeData(nodeData);
  }

  initNodeData = (initNodeData: NodeData) => {
    return {
      ...initNodeData,
      components: initNodeData.components.map((c) => new PinStore(c)),
    };
  };

  get rawNodeData() {
    return {
      ...this.nodeData,
      components: this.nodeData.components.map((c) => c.rawPinData),
    };
  }

  get title() {
    return this.nodeData.name;
  }

  setTitle = (newTitle: string) => {
    this.nodeData.name = newTitle;
  };

  get position() {
    return this.nodeData.initPosition;
  }

  setPosition = (position: Position) => {
    this.nodeData.initPosition = position;
  };

  getPinById = (
    pinId: string,
    components?: ComponentCommon[]
  ): null | ComponentCommon => {
    let target: ComponentCommon | null = null;
    const targetComponents =
      components ?? this.nodeData.components.map((c) => c.rawPinData);
    for (const comp of targetComponents) {
      if (comp.id === pinId) {
        return comp;
      }
      target = this.getPinById(pinId, comp.children ?? []);
      if (target) {
        return target;
      }
    }

    return target;
  };
}
