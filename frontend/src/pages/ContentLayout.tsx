import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar';
import "../styles/ContentLayout.css";

export default function ContentLayout() {
  return (<div className='content-body'>
    <SideBar />
    <main>
      <Outlet />
    </main>
  </div>)
};
