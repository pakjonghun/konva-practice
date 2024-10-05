import { createBrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import LogicBoardSpecList from './pages/logic/LogicBoardSpecList';
import LogicBoardContainer from './pages/logic/LogicBoardContainer';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/logic',
    element: <LogicBoardSpecList />,
    children: [
      {
        path: '/logic/:boardId',
        element: <LogicBoardContainer />,
      },
    ],
  },
]);
