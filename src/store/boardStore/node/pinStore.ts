import { makeAutoObservable } from 'mobx';
import { ComponentCommon } from './type';

export class PinStore {
  pinData: ComponentCommon;
  constructor(pinData: ComponentCommon) {
    this.pinData = pinData;
    makeAutoObservable(this);
  }

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
