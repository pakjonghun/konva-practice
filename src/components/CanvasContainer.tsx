import { useEffect, useRef } from 'react';
import {
  CustomStage,
  CustomLayer,
  BackgroundLayer,
} from '../views/ConvaObjects';
import { usePositionStore } from '../store/nodeStore/positionStore';
import { CanvasRenderer } from '../viewModels/canvasRenderer';

const CanvasContainer = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headerText = usePositionStore((state) => state.title);
  const setHeaderText = usePositionStore((state) => state.setTitle);

  useEffect(() => {
    if (!containerRef.current) return;

    const stage = new CustomStage({
      container: containerRef.current,
      width: 2000,
      height: 2000,
    });

    const backgroundLayer = new BackgroundLayer();
    stage.add(backgroundLayer);

    const layer = new CustomLayer();
    stage.add(layer);

    const renderer = new CanvasRenderer(layer, backgroundLayer);
    renderer.render();

    return () => {
      stage.destroy();
    };
  }, []);

  return <div ref={containerRef} style={{ width: '500px', height: '400px' }} />;
};

export default CanvasContainer;
