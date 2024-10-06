import { observer } from 'mobx-react-lite';
import { nodeStore } from '../../../store/boardStore/node/nodeStore';
import { FC } from 'react';

interface Props {
  nodeId: string;
}

const NodePosition: FC<Props> = ({ nodeId }) => {
  const targetNode = nodeStore.getTargetNodeData(nodeId);
  const { x, y } = targetNode.position;

  return <span>{`x : ${x}, y : ${y}`}</span>;
};

export default observer(NodePosition);
