import { NodeData } from './type';
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
}
