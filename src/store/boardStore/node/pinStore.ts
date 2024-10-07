import { makeAutoObservable } from 'mobx';
import { ComponentCommon, ComponentCommonView } from './type';

export class PinStore {
  pinData: ComponentCommonView;
  constructor(pinData: ComponentCommon) {
    this.pinData = this.initPinData(pinData);
    makeAutoObservable(this);
  }

  get rawPinData() {
    return {
      ...this.pinData,
      children: this.rawChildren,
    };
  }

  get rawChildren(): ComponentCommon[] {
    return this.pinData.children?.map((c) => c.rawPinData) ?? [];
  }

  initPinData = (pinData: ComponentCommon) => {
    return {
      ...pinData,
      children: pinData.children?.map((c) => new PinStore(c)),
    };
  };

  get type() {
    return this.pinData.properties.type;
  }

  setType = (newType: string) => {
    this.pinData.properties.type = newType;
  };

  get name() {
    return this.pinData.properties.name;
  }

  setName = (newName: string) => {
    this.pinData.properties.name = newName;
  };
}
