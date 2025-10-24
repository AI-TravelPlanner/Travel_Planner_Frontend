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
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { useSelector } from "react-redux";

export function AppSidebar({ ...props }) {
  const user = useSelector((state) => state.auth.user); // Firebase user

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
        <TeamSwitcher
          teams={[
            { name: "Acme Inc", logo: GalleryVerticalEnd, plan: "Enterprise" },
            { name: "Acme Corp.", logo: AudioWaveform, plan: "Startup" },
            { name: "Evil Corp.", logo: Command, plan: "Free" },
          ]}
        />
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
