import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { BookMarkedIcon, ClockIcon, CpuIcon, HouseWifiIcon, MusicIcon, StarsIcon, User2Icon, ZapIcon } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";


// This is sample data.
const data = {
  navMain: [
    {
      title: "Main Menu",
      items: [
        { title: "Dashboard", icon: <HouseWifiIcon />, url: "/dashboard" },
        { title: "Song Library", icon: <MusicIcon />, url: "/songs" },
        { title: "AI Remix Generator", icon: <CpuIcon />, url: "/airemix" },
        { title: "Effects & Filter", icon: <StarsIcon />, url: "/effects" },
        { title: "Beat & Tempo Control", icon: <ClockIcon />, url: "/beat" },
        { title: "Saved Remixes/Projects", icon: <BookMarkedIcon />, url: "/saved" },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Other",
      items: [
        { title: "Account", icon: <User2Icon />, url: "/profile" },
      ],
    },
  ],
};


export function AppSidebar({
  ...props
}) {
  const location = useLocation();
  return (
    <Sidebar {...props}>
      <SidebarHeader className={'h-20'}>
        <div className="flex object-cover w-full h-full items-center gap-2"><img src="src/assets/359 1.png" alt="" /><p className=" font-bold text-lg">Logo</p></div>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((group) => (
          <SidebarGroup className="px-4" key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className={"rounded-full p-4 h-fit"}
                      asChild
                      isActive={location.pathname.startsWith(item.url)}
                    >
                      <Link to={item.url} className="flex flex-nowrap items-center gap-6">
                        <div
                          className={`transition-colors ${location.pathname === item.url ? "text-white" : "text-blue-400"
                            }`}
                        >
                          {item.icon}
                        </div>
                        {item.title}
                      </Link>

                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        {data.navSecondary.map((group) => (
          <SidebarGroup className="px-4" key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className={"rounded-full p-4 my-2 h-full"}
                      asChild
                      isActive={location.pathname.startsWith(item.url)}
                    >
                      <NavLink to={item.url} className="flex flex-nowrap items-center gap-6" end={false}>
                        <div
                          className={`transition-colors ${location.pathname.startsWith(item.url) ? "text-white" : "text-blue-400"
                            }`}
                        >
                          {item.icon}
                        </div>
                        {item.title}
                      </NavLink>

                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <SidebarFooter>
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-blue-100">
                <ZapIcon className="w-5 h-5 text-blue-400 fill-current" />
              </div>
            </div>

            {/* Content */}
            <div className="text-center space-y-2 mb-5">
              <h3 className="text-blue-400 font-semibold text-base">
                New Feature
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Unlock <span className="font-medium text-gray-900">New Features</span>
              </p>
            </div>

            {/* Upgrade Button */}
            <button className="w-full bg-blue-400 text-white font-medium py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-sm">
              Upgrade
            </button>
          </div>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
