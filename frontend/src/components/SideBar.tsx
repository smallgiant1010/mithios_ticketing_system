import Tab from "./Tab";

export default function SideBar() {
  const tabs = [
    {
      title: "Tickets",
      link: "/tickets?page=1",
    },
    {
      title: "Drive",
      link: "/drive?page=1",
    },{
      title: "Members",
      link: "/members",
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

