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
        <button
          type="button"
          onClick={() => navigate("/")}
          className="group flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent/60 transition-colors cursor-pointer"
          aria-label="Go to Home"
        >
          {/* Logo*/}
          <div className="shrink-0">
            <Logo />
          </div>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Nomad Group
          </span>
        </button>
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
