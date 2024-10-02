import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { enableMapSet } from 'immer';
import { Theme } from '@radix-ui/themes';
import LogicBoardContainer from './pages/logic/LogicBoardContainer';
import '@radix-ui/themes/styles.css';

const queryClient = new QueryClient();
enableMapSet();

function App() {
  return (
    <Theme>
      <QueryClientProvider client={queryClient}>
        <div
          className="App"
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
          }}
        >
          <LogicBoardContainer />
        </div>
      </QueryClientProvider>
    </Theme>
  );
}

export default App;
