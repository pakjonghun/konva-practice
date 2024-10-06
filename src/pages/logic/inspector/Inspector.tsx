import { observer } from 'mobx-react-lite';
import { inspectorStore } from '../../../store/boardStore/inspector/inspectorStore';
import NodeTitle from './NodeTitle';
import NodePosition from './NodePosition';

const Inspector = () => {
  const selectedNodeIdList = inspectorStore.selectedNodeIdList;

  if (selectedNodeIdList.length === 1) {
    return (
      <div
        style={{
          position: 'absolute',
          right: 0,
          height: '100%',
          width: '200px',
          backgroundColor: 'white',
          zIndex: 9999,
        }}
      >
        <NodePosition nodeId={selectedNodeIdList[0]} />
        <NodeTitle nodeId={selectedNodeIdList[0]} />
      </div>
    );
  }

  return <></>;
};

export default observer(Inspector);
