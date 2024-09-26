import { usePositionStore } from '../store/nodeStore/positionStore';

const RenderCount = () => {
  const renderCount = usePositionStore((state) => state.renderCount);

  return <h1 className="mb-2 font-medium text-2xl">{`랜더링 된 횟수 ${renderCount}`}</h1>;
};

export default RenderCount;
