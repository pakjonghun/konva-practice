import { useEffect, useRef } from 'react';
import { CanvasViewModel } from '../viewModels/canvasViewModel/canvasViewModel';

const CanvasContainer = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const dispose = new CanvasViewModel({
      container: containerRef.current,
      width: width,
      height: height,
    }).render();

    return () => {
      dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default CanvasContainer;
