import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import { useParams } from 'react-router-dom';
import { useBoardData } from '../../hooks/query/logic/useBoardData';
import LogicBoard from './LogicBoard';
import { nodeStore } from '../../store/boardStore/node/nodeStore';
import { NodeData } from '../../store/boardStore/node/type';
import { v4 } from 'uuid';
import Inspector from './inspector/Inspector';

const LogicBoardContainer = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const { data: res, isFetching, isError } = useBoardData(boardId);
  const [isBoardReady, setIsBoardReady] = useState(false);
  useEffect(() => {
    if (!isFetching && res?.data) {
      const nodeList = res.data.node;
      const connectionList = res.data.connection;
      const manyNodeList: NodeData[] = [];

      // for (let i = 0; i < 10; i++) {
      //   nodeList.forEach((n) => {
      //     const newId = v4();
      //     const newPosition = {
      //       x: Math.random() * 800,
      //       y: Math.random() * 800,
      //     };
      //     const newNode = {
      //       ...n,
      //       id: newId,
      //       initPosition: newPosition,
      //     };

      //     manyNodeList.push(newNode);
      //   });
      // }
      // nodeStore.initNode(manyNodeList);
      nodeStore.initNode(nodeList);
      nodeStore.initConnection(connectionList);
      setIsBoardReady(true);
    }

    return () => {
      nodeStore.clearNode();
      nodeStore.clearConnection();
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
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        flex: 1,
      }}
    >
      <LogicBoard />
      <Inspector />
    </div>
  );
};

export default LogicBoardContainer;
