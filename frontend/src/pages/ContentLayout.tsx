import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';

export default function ContentLayout() {
  return (<>
    <SideBar />
    <main>
      <Outlet />
    </main>
  </>)
};
