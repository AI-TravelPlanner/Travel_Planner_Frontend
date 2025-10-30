"use client";

import * as React from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Users,
  Wallet,
  CalendarDays,
  MapPin,
  CloudSun,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import Logo from "@/components/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { SidebarMenu } from "@/components/ui/sidebar";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { SidebarMenuItem } from "@/components/ui/sidebar";

export function AppSidebar({ ...props }) {
  const user = useSelector((state) => state.auth.user); // Firebase user
  const navigate = useNavigate();

  const navMainItems = [
    { title: "Members", icon: Users },
    { title: "Calendar", icon: CalendarDays },
    { title: "Seasons", icon: CloudSun },
    { title: "Budget", icon: Wallet },
    { title: "Province", icon: MapPin },
  ];

  const fullName =
    user?.displayName ||
    (user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : "NA");

  const userData = {
    name: fullName,
    email: user?.email || "NA",
    avatar: user?.photoURL || null,
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="cursor-pointer"
              onClick={() => navigate("/")}
            >
              {/* Icon / Logo: stays visible in collapsed mode */}
              <div className="flex size-8 items-center justify-center rounded-lg">
                <Logo />
              </div>

              {/* Text: automatically hides when sidebar is collapsed to icon */}
              <span className="text-sm font-semibold tracking-tight text-foreground group-data-[collapsible=icon]:hidden">
                Nomad Group
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navMainItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
