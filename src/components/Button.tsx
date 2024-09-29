import { useCallback, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import { useBoardStore } from '../store/boardStore/boardStore';
import { useNodeStore } from '../store/nodeStore/nodeStore';

const Button = () => {
  const setCount = useBoardStore((state) => state.setCount);
  const count = useBoardStore((state) => state.count);

  const [keyword, setKeyword] = useState(String(count));
  const handleChangeKeyword = useCallback((value: string) => {
    setKeyword(value);
  }, []);

  const delayText = useDebounce({ initText: keyword });

  const handleClickButton = () => {
    setCount(parseFloat(delayText));
  };

  useNodeStore((s) => s.setNode);

  return (
    <div>
      <input
        className="border bg-gray-100"
        value={keyword}
        onChange={(event) => handleChangeKeyword(event.target.value)}
      />
      <button className="bg-sky-50 border-2 border-red-100" onClick={handleClickButton}>
        증식
      </button>
      <button className="bg-sky-50 border-2 border-red-100" onClick={handleClickButton}>
        노드 맵 업데이트
      </button>
    </div>
  );
};

export default Button;
