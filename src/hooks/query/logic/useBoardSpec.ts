import { useQuery } from '@tanstack/react-query';
import { BoardSpec } from '../../../store/boardStore/board/type';
import axios from 'axios';

const instance = axios.create();
const BOARD_SPEC = 'BOARD_SPEC';
type ResponseBoard = { data: Array<BoardSpec> };

const boardSpecList = () => {
  return instance.get('/boardSpec.json').then((res) => res.data);
};

export const useBoardSpecList = () => {
  return useQuery<ResponseBoard, void>({
    queryKey: [BOARD_SPEC],
    queryFn: boardSpecList,
  });
};

//
