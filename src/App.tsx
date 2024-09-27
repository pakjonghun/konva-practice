import Button from './components/Button';
import CanvasContainer from './components/CanvasContainer';
import Input from './components/Input';
import RenderCount from './components/RenderCount';

function App() {
  return (
    <div className="App">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0px',
          margin: '0px',
          border: '5px solid red',
          overflow: 'hidden',
        }}
      >
        <RenderCount />
        <Input />
        <Button />
        <CanvasContainer />
      </div>
    </div>
  );
}

export default App;
