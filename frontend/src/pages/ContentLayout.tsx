import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar';

export default function ContentLayout() {
  return (<>
    <SideBar />
    <main>
      <Outlet />
    </main>
  </>)
};
