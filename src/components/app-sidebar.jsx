"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Calendar,
  Command,
  Frame,
  GalleryVerticalEnd,
  LocateIcon,
  Map,
  PersonStanding,
  PersonStandingIcon,
  PieChart,
  Settings2,
  SquareTerminal,
  Users,
  Wallet,
  CalendarDays,
  MapPin,
  CloudSun,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
// import { monthsInYear } from "date-fns/constants";
// import { FaMoneyCheck } from "react-icons/fa";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Members",
      url: "#",
      icon: Users,
      isActive: true,
      items: [],
    },
    {
      title: "Calendar",
      url: "#",
      icon: CalendarDays,
      isActive: true,
      items: [],
    },
    {
      title: "Seasons",
      url: "#",
      icon: CloudSun,
      isActive: true,
      items: [],
    },
    {
      title: "Budget",
      url: "#",
      icon: Wallet,
      isActive: true,
      items: [],
    },
    {
      title: "Province",
      url: "#",
      icon: MapPin,
      isActive: true,
      items: [],
    },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
