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
  Filter,
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
  const filterState = useSelector((state) => state.filter);
  const { theme, season } = useSeason();

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

  const handleApplyFilters = () => {
    const allFilters = {
      ...filterState,
      theme: season,
    };
    console.log('All filter values:', allFilters);
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

      <SidebarFooter className="gap-2">
        <button
          onClick={handleApplyFilters}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 ${theme.button} ${theme.buttonShadow} rounded-lg transition-all font-medium group-data-[collapsible=icon]:hidden`}
        >
          <Filter className="w-4 h-4" />
          <span>Apply Filters</span>
        </button>
        
        <NavUser user={userData} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}