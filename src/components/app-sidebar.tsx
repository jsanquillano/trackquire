import * as React from "react";
import { Link, useLocation } from "react-router-dom";

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
} from "@/components/ui/sidebar";

import {
  RiScanLine,
  RiBardLine,
  RiUserFollowLine,
  RiCodeSSlashLine,
  RiLoginCircleLine,
} from "@remixicon/react";

const data = {
  navMain: [
    {
      title: "Main",
      items: [
        { title: "Dashboard", url: "/", icon: RiScanLine },
        { title: "Departments", url: "/departments", icon: RiBardLine },
        { title: "Documents", url: "/documents", icon: RiLoginCircleLine },
        {
          title: "Administrators",
          url: "/administrators",
          icon: RiUserFollowLine,
        },
        {
          title: "Announcements",
          url: "/announcements",
          icon: RiCodeSSlashLine,
        },
      ],
    },
  ],
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <img src="/npax-logo.png" alt="npax logo" className="h-auto w-full" />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((group, groupIdx) => (
          <SidebarGroup key={groupIdx}>
            {group.title && (
              <SidebarGroupLabel className="uppercase text-muted-foreground/60">
                {group.title}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent className="px-2">
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive =
                    location.pathname === item.url ||
                    location.pathname.startsWith(item.url + "/");

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`group/menu-button font-medium gap-3 h-9 rounded-md 
            bg-gradient-to-r hover:bg-transparent 
            hover:from-sidebar-accent hover:to-sidebar-accent/40 
            data-[active=true]:bg-yellow-200
            [&>svg]:size-auto`}
                        data-active={isActive}
                      >
                        <Link to={item.url}>
                          {item.icon && (
                            <item.icon
                              className="text-muted-foreground/60 
                  group-data-[active=true]/menu-button:text-primary"
                              size={22}
                              aria-hidden="true"
                            />
                          )}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
