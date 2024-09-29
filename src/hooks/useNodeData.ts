import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BoardData } from '../store/logicStore/types/logic';

const instance = axios.create();
const NODE_DATA = 'NODE_DATA';
type ResponseBoard = BoardData;

const loadNodeData = () => {
  return instance.get('/nodeData.json').then((res) => res.data);
};

export const useLoadNodeData = () => {
  return useQuery<ResponseBoard, void>({
    queryKey: [NODE_DATA],
    queryFn: loadNodeData,
  });
};
