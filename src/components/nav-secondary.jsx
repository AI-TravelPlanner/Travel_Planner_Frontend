"use client";

import * as React from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import your specific Thunk
import { logBoardsStateThunk } from "@/redux-slices/thunkSave";

// Import Icons (assuming standard lucide-react icons for Save and Briefcase)
import { Save, Briefcase } from "lucide-react"

import { toast } from "sonner";

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
    // 1. Auth Check
    if (!user) {
      toast.error("Authentication Required", {
        description: "Please log in to save your trip.",
      });
      return;
    }

    // 2. Start Loading Toast
    const toastId = toast.loading("Saving trip details...");

    try {
      // 3. Perform Async Action
      await dispatch(logBoardsStateThunk(user.email)).unwrap();

      // 4. Update Loading Toast to Success
      toast.success("Trip Saved", {
        description: "Your trip has been saved successfully!",
        id: toastId, // This replaces the loading toast
      });

    } catch (error) {
      console.error(error);

      // 5. Update Loading Toast to Error
      toast.error("Save Failed", {
        description: "Could not save trip. Please try again.",
        id: toastId, // This replaces the loading toast
      });
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