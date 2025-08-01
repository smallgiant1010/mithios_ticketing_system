import Tab from "./Tab";

export default function SideBar() {
  const tabs = [
    {
      title: "Tickets",
      link: "/",
    },
    {
      title: "Drive",
      link: "/",
    },{
      title: "Members",
      link: "/",
    },{
      title: "Phases",
      link: "/",
    },{
      title: "Profile",
      link: "/profile",
    },];

  return (<aside>
    {tabs.map((tab, idx) => <Tab key={idx} data={tab} />)}
  </aside>)
}

