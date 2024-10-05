import { FC, useEffect, useState } from 'react';

interface Props {
  initText: string;
  delay?: number;
}

const useDebounce = ({ initText, delay = 200 }: Props) => {
  const [delayText, setDelayText] = useState(initText);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayText(initText);
    }, delay);

    return () => clearTimeout(timer);
  }, [initText]);

  return delayText;
};

export default useDebounce;
