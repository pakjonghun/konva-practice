import { useCallback, useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import { usePositionStore } from '../store/nodeStore/positionStore';

const Input = () => {
  const setHeaderTitle = usePositionStore((state) => state.setTitle);
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
      value={keyword}
      onChange={(event) => handleChangeKeyword(event.target.value)}
    />
  );
};

export default Input;
