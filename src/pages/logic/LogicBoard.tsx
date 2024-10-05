import { useEffect, useRef } from 'react';
import { BG_COLOR } from '../../constants/canvas';
import { CanvasViewModel } from '../../viewModels/board/canvasViewModel';
import { useParams } from 'react-router-dom';

const LogicBoard = () => {
  const { boardId } = useParams() as { boardId: string };
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const canvasViewModel = new CanvasViewModel({
      id: boardId,
      container: containerRef.current,
      width: width,
      height: height,
    });

    return () => {
      canvasViewModel.dispose();
    };
  }, [boardId]);

  return (
    <div
      ref={containerRef}
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: BG_COLOR,
        border: '5px solid red',
      }}
    />
  );
};

export default LogicBoard;
