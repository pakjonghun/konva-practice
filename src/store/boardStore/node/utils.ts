import { Connection } from '../connection/type';
import { ComponentCommon } from './type';

export function setPin(pinData: ComponentCommon[], map: Map<string, ComponentCommon>) {
  pinData.forEach((pin) => {
    map.set(pin.id, pin);
    if (pin.children) {
      setPin(pin.children, map);
    }
  });
}

export function connectId({ from, to }: Connection) {
  return `${from}_${to}`;
}

export function pinIdByConnect(id: string) {
  const split = id.split('_');
  return {
    from: split[0],
    to: split[1],
  };
}
