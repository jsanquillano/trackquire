// src/layouts/MainLayout.tsx

import { Outlet } from "react-router-dom";

import { AppSidebar } from "@/components/app-sidebar";
import UserDropdown from "@/components/user-dropdown";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const MainLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger className="-ms-4" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <h1 className="text-2xl font-bold">Trackquire</h1>
          </div>
          <div className="flex gap-3 ml-auto">
            <UserDropdown />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
