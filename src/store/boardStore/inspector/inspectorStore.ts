import { makeAutoObservable } from 'mobx';

class InspectorStore {
  selectedNodeIdList: Array<string> = [];

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedNodeIdList = (nodeIdList: string[]) => {
    this.selectedNodeIdList = nodeIdList;
  };

  get selectedNodeList() {
    return this.selectedNodeIdList;
  }
}

export const inspectorStore = new InspectorStore();
