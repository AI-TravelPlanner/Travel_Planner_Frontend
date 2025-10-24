"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import HeadCount from "./head-count";

// List of Canadian provinces
const provinces = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Nova Scotia",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Northwest Territories",
  "Nunavut",
  "Yukon",
];

// List of seasons
const seasons = ["Spring", "Summer", "Autumn", "Winter"];

export function NavMain({ items }) {
  const [date, setDate] = useState(new Date());
  const [province, setProvince] = useState("Ontario");
  const [season, setSeason] = useState("Summer");
  const [minBudget, setMinBudget] = useState(0);
  const [maxBudget, setMaxBudget] = useState(50000);
  const [activeInput, setActiveInput] = useState(null);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item, index) => (
          <Collapsible key={index} asChild className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                  <item.icon className="w-4 h-4 mr-2" />
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarMenuSub className="p-3 space-y-3">
                  {/* Members Section */}
                  {item.title === "Members" && (
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <HeadCount />
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  )}

                  {/* Budgets Section */}
                  {item.title === "Budget" && (
                    <SidebarMenuSubItem>
                      <div className="flex flex-col gap-3">
                        <label className="text-sm font-medium">Budget</label>

                        {/* Single Slider */}
                        <Slider
                          value={[
                            activeInput === "max" ? maxBudget : minBudget,
                          ]}
                          onValueChange={(val) => {
                            const newVal = val[0];
                            if (activeInput === "min") {
                              if (newVal <= maxBudget) setMinBudget(newVal);
                            } else if (activeInput === "max") {
                              if (newVal >= minBudget) setMaxBudget(newVal);
                            } else {
                              setMinBudget(newVal);
                            }
                          }}
                          max={50000}
                          step={1000}
                        />

                        <div className="flex items-center gap-3">
                          {/* Minimum Input */}
                          <div className="flex items-center gap-1 w-full">
                            <span className="text-sm text-muted-foreground">
                              $
                            </span>
                            <Input
                              type="number"
                              value={minBudget}
                              onFocus={() => setActiveInput("min")}
                              onChange={(e) => {
                                let val = Number(e.target.value);
                                if (val >= 0 && val <= maxBudget)
                                  setMinBudget(val);
                              }}
                              min={0}
                              max={maxBudget}
                            />
                          </div>

                          <span className="text-sm text-muted-foreground">
                            —
                          </span>

                          {/* Maximum Input */}
                          <div className="flex items-center gap-1 w-full">
                            <span className="text-sm text-muted-foreground">
                              $
                            </span>
                            <Input
                              type="number"
                              value={maxBudget}
                              onFocus={() => setActiveInput("max")}
                              onChange={(e) => {
                                let val = Number(e.target.value);
                                if (val >= minBudget && val <= 50000)
                                  setMaxBudget(val);
                              }}
                              min={minBudget}
                              max={50000}
                            />
                          </div>
                        </div>

                        <p className="text-xs text-muted-foreground">
                          {activeInput === "min"
                            ? "Adjusting minimum budget"
                            : activeInput === "max"
                            ? "Adjusting maximum budget"
                            : "Select a field to adjust"}
                        </p>
                      </div>
                    </SidebarMenuSubItem>
                  )}

                  {/* Calendar Section */}
                  {item.title === "Calendar" && (
                    <SidebarMenuSubItem>
                      <div className="flex flex-col gap-3">
                        <label className="text-sm font-medium">
                          Select Date
                        </label>
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="rounded-md border"
                        />
                      </div>
                    </SidebarMenuSubItem>
                  )}

                  {/* Province Section */}
                  {item.title === "Province" && (
                    <SidebarMenuSubItem>
                      <div className="flex flex-col gap-3">
                        <label className="text-sm font-medium">
                          Select Province
                        </label>
                        <Select value={province} onValueChange={setProvince}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select province" />
                          </SelectTrigger>
                          <SelectContent>
                            {provinces.map((prov) => (
                              <SelectItem key={prov} value={prov}>
                                {prov}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </SidebarMenuSubItem>
                  )}

                  {/* Seasons Section */}
                  {item.title === "Seasons" && (
                    <SidebarMenuSubItem>
                      <div className="flex flex-col gap-3">
                        <label className="text-sm font-medium">
                          Select Season
                        </label>
                        <Select value={season} onValueChange={setSeason}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select season" />
                          </SelectTrigger>
                          <SelectContent>
                            {seasons.map((s) => (
                              <SelectItem key={s} value={s}>
                                {s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </SidebarMenuSubItem>
                  )}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
