import { useEffect, useRef } from 'react';
import { CanvasViewModel } from '../viewModels/canvasViewModel';

const CanvasContainer = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const canvasViewModel = new CanvasViewModel({
      container: containerRef.current,
      width: 2000,
      height: 2000,
    });
    canvasViewModel.render();

    return () => {
      canvasViewModel.destroy();
    };
  }, []);

  return <div ref={containerRef} style={{ width: '2000px', height: '4000px' }} />;
};

export default CanvasContainer;
