import { NavLink } from 'react-router-dom';

export default function Tab({ data }: { data: { title: string, link: string } }) {
  return (<div className="default-tab-style">
    <NavLink to={data.link} className={({ isActive, isPending }) => isActive ? "active": "idle"}>{data.title}</NavLink>
  </div>);
}
