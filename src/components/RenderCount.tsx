import { useBoardStore } from '../store/boardStore/boardStore';

const RenderCount = () => {
  const renderCount = useBoardStore((state) => state.renderCount);

  return <h1 className="mb-2 font-medium text-2xl">{`랜더링 된 횟수 ${renderCount}`}</h1>;
};

export default RenderCount;
