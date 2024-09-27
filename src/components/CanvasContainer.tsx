import { useEffect, useRef } from 'react';
import { CanvasViewModel } from '../viewModels/canvasViewModel/canvasViewModel';

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

  return <div ref={containerRef} style={{ flex: 1, width: '100%' }} />;
};

export default CanvasContainer;
