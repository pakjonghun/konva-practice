import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BoardData } from '../../../store/boardStore/board/type';

const instance = axios.create();
const BOARD_DATA = 'BOARD_DATA';
type ResponseBoard = { data: BoardData };

const boardData = (boardId: string) => {
  return instance.get(`/boardData_${boardId}.json`).then((res) => res.data);
};

export const useBoardData = (boardId?: string) => {
  return useQuery<ResponseBoard, void>({
    queryKey: [BOARD_DATA],
    enabled: !!boardId,
    queryFn: () => boardData(boardId!),
  });
};
