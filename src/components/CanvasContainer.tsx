import { useEffect, useRef } from 'react';
import { CanvasViewModel } from '../viewModels/canvasViewModel/canvasViewModel';
import { BG_COLOR } from '../constants/canvas';

const CanvasContainer = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const canvasViewModel = new CanvasViewModel({
      container: containerRef.current,
      width: width,
      height: height,
    });

    return () => {
      canvasViewModel.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ flex: 1, width: '100%', backgroundColor: BG_COLOR, border: '5px solid red' }}
    />
  );
};

export default CanvasContainer;
