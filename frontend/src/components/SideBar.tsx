import Tab from "./Tab";

export default function SideBar() {
  const tabs = [
    {
      title: "Tickets",
      link: "/tickets?page=1",
      img_path:"/images/eye.png",
    },
    {
      title: "Drive",
      link: "/drive?page=1",
      img_path:"/images/folder.png",
    },{
      title: "Members",
      link: "/members",
      img_path:"/images/user.png",
    },{
      title: "Resources",
      link: "/resources",
      img_path:"/images/file.png",
    },{
      title: "Profile",
      link: "/profile",
      img_path:"/images/settings.png",
    },];

  return (<aside>
    {tabs.map((tab, idx) => <Tab key={idx} data={tab} />)}
  </aside>)
}

