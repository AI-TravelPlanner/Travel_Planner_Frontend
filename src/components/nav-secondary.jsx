"use client";

import * as React from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import your specific Thunk
import { logBoardsStateThunk } from "@/redux-slices/thunkSave";

// Import Icons (assuming standard lucide-react icons for Save and Briefcase)
import { Save, Briefcase } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"

export function NavSecondary({
  ...props
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user from Redux to ensure they are logged in
  const { user } = useSelector((state) => state.auth);

  // --- Handler 1: Save Trip ---
  const handleSaveClick = async () => {
    if (!user) {
      alert("Please log in to save your trip.");
      return;
    }

    try {
      // Dispatch your existing Thunk
      await dispatch(logBoardsStateThunk(user.email)).unwrap();
      alert("Trip saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save trip.");
    }
  };

  // --- Handler 2: View My Trips ---
  const handleViewTripsClick = () => {
    if (!user) {
      alert("Please log in to view your trips.");
      return;
    }
    navigate("/dashboard/mytrips");
  };

  return (
    <SidebarGroup {...props}>
      <SidebarGroupLabel>My Trips</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>

          {/* Button 1: Save Trip */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild={false}
              onClick={handleSaveClick} // Attach dedicated handler
              className="cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Save size={18} />
                <span>Save Trip</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Button 2: View My Trips */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild={false}
              onClick={handleViewTripsClick} // Attach dedicated handler
              className="cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Briefcase size={18} />
                <span>View My Trips</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>

        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}