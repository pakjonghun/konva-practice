import { useCallback, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import { usePositionStore } from '../store/nodeStore/positionStore';

const Button = () => {
  const setCount = usePositionStore((state) => state.setCount);
  const count = usePositionStore((state) => state.count);

  const [keyword, setKeyword] = useState(String(count));
  const handleChangeKeyword = useCallback((value: string) => {
    setKeyword(value);
  }, []);

  const delayText = useDebounce({ initText: keyword });

  const handleClickButton = () => {
    setCount(parseFloat(delayText));
  };

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
    </div>
  );
};

export default Button;
