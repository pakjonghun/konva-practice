import { makeAutoObservable } from 'mobx';
import { ComponentCommon, NodeBinding } from './type';
import { setPin } from './utils';

export class PinStore {
  nodeById: Map<string, NodeBinding>;
  constructor(nodeById: Map<string, NodeBinding>) {
    this.nodeById = nodeById;
    makeAutoObservable(this);
  }

  get pinById() {
    const pinById = new Map<string, ComponentCommon>();
    this.nodeById.forEach((node) => {
      setPin(node.nodeData.components, pinById);
    });
    return pinById;
  }

  type = (pinId: string) => {
    return this.getTargetPinData(pinId).properties.type;
  };

  setType = (pinId: string, type: string) => {
    this.getTargetPinData(pinId).properties.type = type;
  };

  getTargetPinData = (pinId: string) => {
    const pinData = this.pinById.get(pinId);
    if (!pinData) {
      throw new Error('핀데이터가 존재하지 않습니다.');
    }

    return pinData;
  };

  tryConnect = (fromPinId: string, toPinId: string) => {
    //
  };
}
