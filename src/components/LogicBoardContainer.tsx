import { useEffect, useState } from 'react';
import { useLoadNodeData } from '../hooks/useNodeData';
import { useNodeStore } from '../store/nodeStore/nodeStore';
import CanvasContainer from './CanvasContainer';

const LogicBoardContainer = () => {
  const { isFetching, data } = useLoadNodeData();
  const setNodeList = useNodeStore((state) => state.setNodeList);
  const setConnectionList = useNodeStore((state) => state.setConnectionList);
  const [isBoardReady, setIsBoardReady] = useState(false);

  useEffect(() => {
    if (!isFetching && data) {
      setNodeList(data.nodes);
      setConnectionList(data.pinConnections);
      setIsBoardReady(true);
    }
  }, [data, isFetching, setNodeList, setConnectionList]);

  if (!isBoardReady || isFetching) {
    return <div className="bg-pink-100 h-full w-full">로딩중입니다.</div>;
  }

  return <CanvasContainer />;
};

export default LogicBoardContainer;
