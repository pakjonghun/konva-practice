import Loading from '../../components/Loading';
import { TabNav } from '@radix-ui/themes';
import { useBoardSpecList } from '../../hooks/query/logic/useBoardSpec';
import { Outlet } from 'react-router-dom';

const LogicBoardSpecList = () => {
  const { data: res, isLoading } = useBoardSpecList();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <TabNav.Root>
        <div>
          {res?.data?.map(({ name, id }) => {
            return (
              <TabNav.Link key={id} href={`/logic/${id}`}>
                {name}
              </TabNav.Link>
            );
          })}
        </div>
      </TabNav.Root>
      <Outlet />
    </div>
  );
};

export default LogicBoardSpecList;
