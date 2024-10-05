import { TabNav } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

function App() {
  return (
    <div className="App">
      <TabNav.Root>
        <TabNav.Link href="logic">로직에셋</TabNav.Link>
      </TabNav.Root>
    </div>
  );
}

export default App;
