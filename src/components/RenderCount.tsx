import { usePositionStore } from '../store/nodeStore/positionStore';

const RenderCount = () => {
  const renderCount = usePositionStore((state) => state.renderCount);

  return <h1>{`${renderCount} 랜더링 된 숫자`}</h1>;
};

export default RenderCount;
