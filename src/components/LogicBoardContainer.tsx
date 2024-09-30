import { useEffect, useState } from 'react';
import { useLoadNodeData } from '../hooks/useNodeData';
import CanvasContainer from './LogicBoard';
import { useLogicStore } from '../store/logicStore/logicStore';

const LogicBoardContainer = () => {
  const { isFetching, data } = useLoadNodeData();
  const setBoardData = useLogicStore((state) => state.initBoardData);
  const [isBoardReady, setIsBoardReady] = useState(false);

  useEffect(() => {
    if (!isFetching && data) {
      setBoardData(data);
      setIsBoardReady(true);
    }
  }, [data, isFetching]);

  if (!isBoardReady || isFetching || !data?.id) {
    return <div className="bg-pink-100 h-full w-full">로딩중입니다.</div>;
  }

  return <CanvasContainer boardId={data.id} />;
};

export default LogicBoardContainer;
