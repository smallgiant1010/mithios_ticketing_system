import { NavLink } from 'react-router-dom';

export default function Tab({ data }: { data: { title: string, link: string, img_path: string, } }) {
  return (<NavLink to={data.link} className="navlink"> 
    {({ isActive }) => (
      <div className={`default-tab-style ${isActive ? "active": "idle"}`}>
        <img src={data.img_path} width={64} height={64} alt="icons"/>
        <div>{data.title}</div>
      </div>
    )}
  </NavLink>);
}