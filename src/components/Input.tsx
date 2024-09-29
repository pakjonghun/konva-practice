import { useCallback, useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import { useBoardStore } from '../store/boardStore/boardStore';

const Input = () => {
  const setHeaderTitle = useBoardStore((state) => state.setTitle);
  const [keyword, setKeyword] = useState('');
  const handleChangeKeyword = useCallback((value: string) => {
    setKeyword(value);
  }, []);

  const delayText = useDebounce({ initText: keyword });
  useEffect(() => {
    setHeaderTitle(delayText);
  }, [delayText]);

  return (
    <input
      className="border bg-gray-100"
      value={keyword}
      onChange={(event) => handleChangeKeyword(event.target.value)}
    />
  );
};

export default Input;
