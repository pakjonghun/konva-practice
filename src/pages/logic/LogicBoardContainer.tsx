import { useEffect, useState } from 'react';
import CanvasContainer from './LogicBoard';
import Loading from '../../components/Loading';
import { useLoadNodeData } from '../../hooks/useNodeData';
import { useLogicStore } from '../../store/logicStore/logicStore';

const LogicBoardContainer = () => {
  const { isFetching, data } = useLoadNodeData();
  const setBoardData = useLogicStore((state) => state.initBoardData);
  const [isBoardReady, setIsBoardReady] = useState(false);

  useEffect(() => {
    if (!isFetching && data) {
      setBoardData(data);
      setIsBoardReady(true);
    }
  }, [data, isFetching, setBoardData]);

  if (!isBoardReady || isFetching || !data?.id) {
    return <Loading />;
  }

  return <CanvasContainer boardId={data.id} />;
};

export default LogicBoardContainer;
