import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Button from './components/Button';
import CanvasContainer from './components/LogicBoard';
import Input from './components/Input';
import RenderCount from './components/RenderCount';

import { enableMapSet } from 'immer';
import LogicBoardContainer from './components/LogicBoardContainer';
const queryClient = new QueryClient();
enableMapSet();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0px',
            margin: '0px',
            height: '100vh',
          }}
        >
          <RenderCount />
          <Input />
          <Button />
          <LogicBoardContainer />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
