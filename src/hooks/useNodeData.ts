import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { NodeData, PinConnection } from '../store/nodeStore/types';

const instance = axios.create();
const NODE_DATA = 'NODE_DATA';
type ResponseBoard = { nodes: NodeData[]; pinConnections: PinConnection[] };

const loadNodeData = () => {
  return instance.get('/nodeData.json').then((res) => res.data);
};

export const useLoadNodeData = () => {
  return useQuery<ResponseBoard, void>({
    queryKey: [NODE_DATA],
    queryFn: loadNodeData,
  });
};
