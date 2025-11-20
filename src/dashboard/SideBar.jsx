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
import { useSeason } from "@/dashboard/SeasonThemeSystem";

export function AppSidebar({ ...props }) {
  const user = useSelector((state) => state.auth.user);
  const { theme } = useSeason();

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
    <Sidebar 
      collapsible="icon" 
      {...props}
      className={`${theme.sidebarBg} ${theme.sidebarBorder} ${theme.sidebarInnerGlow} transition-all duration-1000 backdrop-blur-2xl`}
    >
      {/* Decorative top gradient */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${theme.accent} opacity-60`}></div>
      
      <SidebarHeader className="border-b border-white/10">
        <TeamSwitcher
          teams={[
            { name: "Acme Inc", logo: GalleryVerticalEnd, plan: "Enterprise" },
            { name: "Acme Corp.", logo: AudioWaveform, plan: "Startup" },
            { name: "Evil Corp.", logo: Command, plan: "Free" },
          ]}
        />
      </SidebarHeader>

      <SidebarContent className={theme.sidebarText}>
        <NavMain items={navMainItems} />
      </SidebarContent>

      <SidebarFooter className="border-t border-white/10">
        <NavUser user={userData} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}