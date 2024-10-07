import { ComponentCommon } from './type';

export function setPin(pinData: ComponentCommon[], map: Map<string, ComponentCommon>) {
  pinData.forEach((pin) => {
    map.set(pin.id, pin);
    if (pin.children) {
      setPin(pin.children, map);
    }
  });
}
