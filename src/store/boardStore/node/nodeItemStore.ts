import { ComponentCommon, NodeData, Position } from './type';
import { makeAutoObservable } from 'mobx';

export class NodeItemStore {
  nodeData: NodeData;

  constructor(initNodeData: NodeData) {
    makeAutoObservable(this);
    this.nodeData = initNodeData;
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

  getPinById = (pinId: string, components?: ComponentCommon[]): null | ComponentCommon => {
    let target: ComponentCommon | null = null;
    const targetComponents = components ?? this.nodeData.components;
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
