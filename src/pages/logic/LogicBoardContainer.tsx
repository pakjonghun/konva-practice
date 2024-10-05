import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import { useParams } from 'react-router-dom';
import { useBoardData } from '../../hooks/query/logic/useBoardData';
import LogicBoard from './LogicBoard';
import { nodeStore } from '../../store/boardStore/node/nodeStore';

const LogicBoardContainer = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const { data: res, isFetching, isError } = useBoardData(boardId);
  const [isBoardReady, setIsBoardReady] = useState(false);

  useEffect(() => {
    if (!isFetching && res?.data) {
      nodeStore.initNode(res.data.node);
      setIsBoardReady(true);
    }

    return () => {
      nodeStore.clear();
    };
  }, [isFetching, res]);

  if (isFetching) {
    return <Loading />;
  }

  if ((!res?.data && !isFetching) || isError) {
    return <p>보드 데이터 로드가 실패했습니다.</p>;
  }

  if (!isBoardReady) {
    return <p>보드 데이터 준비 중입니다.</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', flex: 1 }}>
      <LogicBoard />
    </div>
  );
};

export default LogicBoardContainer;
