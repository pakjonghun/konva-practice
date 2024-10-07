import { observer } from 'mobx-react-lite';
import { nodeStore } from '../../../store/boardStore/node/nodeStore';
import { FC } from 'react';

interface Props {
  nodeId: string;
}

const NodeTitle: FC<Props> = ({ nodeId }) => {
  const nodeName = nodeStore.nodeItemStore.title(nodeId);
  const setNodeName = (newName: string) => nodeStore.nodeItemStore.setTitle(nodeId, newName);

  return (
    <input
      onChange={(e) => setNodeName(e.target.value)}
      value={nodeName}
      placeholder="노드 이름"
      className="bg-white border-black border-2 p-1"
    />
  );
};

export default observer(NodeTitle);
