"use client";

import { useSelector, useDispatch } from "react-redux";
import { ChevronRight, Flower2, Sun, Leaf, Snowflake } from "lucide-react";
import { useState, useEffect } from "react";

import { useSeason } from "@/dashboard/SeasonThemeSystem";

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

import BudgetSlider from "@/components/budget-slider";
import DateRangePicker from "@/components/date-range-picker";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import HeadCount from "./head-count";

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

const seasons = ["Spring", "Summer", "Autumn", "Winter"];

const seasonIcons = {
  Spring: Flower2,
  Summer: Sun,
  Autumn: Leaf,
  Winter: Snowflake,
};

export function NavMain({ items, onFiltersChange }) {
  const { budget, headCount, province, season, date } = useSelector(
    (state) => state.filter
  );
  const [minBudget, maxBudget] = budget;
  
  const seasonContext = useSeason();
  const { theme } = seasonContext || { theme: {} };

  // Local state for temporary filter values
  const [tempFilters, setTempFilters] = useState({
    budget: [minBudget, maxBudget],
    headCount,
    province,
    season,
    date,
  });

  // Update parent component whenever tempFilters change
  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange(tempFilters);
    }
  }, [tempFilters, onFiltersChange]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel className={`${theme.textSecondary} transition-colors duration-700`}>
        Platform
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item, index) => (
          <Collapsible key={index} asChild className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className={`
                  ${theme.mutedHover} transition-all duration-300
                  group-data-[state=open]/collapsible:${theme.muted}
                `}>
                  <item.icon className={`w-4 h-4 mr-2 ${theme.accentText} transition-colors duration-700`} />
                  <span className={`${theme.textPrimary} transition-colors duration-700`}>{item.title}</span>
                  <ChevronRight className={`ml-auto transition-transform duration-200 ${theme.textMuted} group-data-[state=open]/collapsible:rotate-90`} />
                </SidebarMenuButton>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarMenuSub className={`p-3 space-y-3 ${theme.muted} ${theme.mutedBorder} rounded-lg mt-2 transition-all duration-700`}>
                  {/* Members Section */}
                  {item.title === "Members" && (
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <HeadCount
                          value={tempFilters.headCount}
                          onChange={(val) => setTempFilters({...tempFilters, headCount: val})}
                        />
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  )}

                  {/* Budgets Section */}
                  {item.title === "Budget" && (
                    <SidebarMenuSubItem>
                      <div className="flex flex-col gap-3">
                        <label className={`text-sm font-medium ${theme.textPrimary} transition-colors duration-700`}>
                          Create Budget
                        </label>

                        <BudgetSlider
                          value={tempFilters.budget}
                          onValueChange={([newMin, newMax]) => {
                            if (newMin <= newMax)
                              setTempFilters({...tempFilters, budget: [newMin, newMax]});
                          }}
                          max={50000}
                          step={1000}
                        />

                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 w-full">
                            <span className={`text-sm ${theme.textMuted} transition-colors duration-700`}>
                              $
                            </span>
                            <Input
                              type="number"
                              value={tempFilters.budget[0]}
                              onChange={(e) => {
                                let val = Number(e.target.value);
                                if (val >= 0 && val <= tempFilters.budget[1])
                                  setTempFilters({...tempFilters, budget: [val, tempFilters.budget[1]]});
                              }}
                              min={0}
                              max={tempFilters.budget[1]}
                              className={`${theme.input} transition-all duration-700`}
                            />
                          </div>

                          <span className={`text-sm ${theme.textMuted} transition-colors duration-700`}>
                            —
                          </span>

                          <div className="flex items-center gap-1 w-full">
                            <span className={`text-sm ${theme.textMuted} transition-colors duration-700`}>
                              $
                            </span>
                            <Input
                              type="number"
                              value={tempFilters.budget[1]}
                              onChange={(e) => {
                                let val = Number(e.target.value);
                                if (val >= tempFilters.budget[0] && val <= 50000)
                                  setTempFilters({...tempFilters, budget: [tempFilters.budget[0], val]});
                              }}
                              min={tempFilters.budget[0]}
                              max={50000}
                              className={`${theme.input} transition-all duration-700`}
                            />
                          </div>
                        </div>

                        <p className={`text-xs ${theme.textMuted} transition-colors duration-700`}>
                          Adjust your budget range
                        </p>
                      </div>
                    </SidebarMenuSubItem>
                  )}

                  {/* Calendar Section */}
                  {item.title === "Calendar" && (
                    <SidebarMenuSubItem>
                      <div className="flex flex-col gap-3 w-full">
                        <label className={`text-sm font-medium ${theme.textPrimary} transition-colors duration-700`}>
                          Select Date
                        </label>
                        <DateRangePicker
                          mode="single"
                          selected={tempFilters.date || null}
                          onSelect={(val) => {
                            if (val) setTempFilters({...tempFilters, date: val});
                          }}
                          className={`w-full rounded-md border px-2 py-1 ${theme.input} transition-all duration-700`}
                          placeholder="Select a date"
                        />
                      </div>
                    </SidebarMenuSubItem>
                  )}

                  {/* Province Section */}
                  {item.title === "Province" && (
                    <SidebarMenuSubItem>
                      <div className="flex flex-col gap-3">
                        <label className={`text-sm font-medium ${theme.textPrimary} transition-colors duration-700`}>
                          Select Province
                        </label>
                        <Select
                          value={tempFilters.province}
                          onValueChange={(val) => setTempFilters({...tempFilters, province: val})}
                        >
                          <SelectTrigger className={`w-full ${theme.input} transition-all duration-700`}>
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
                        <label className={`text-sm font-medium ${theme.textPrimary} transition-colors duration-700`}>
                          Select Season
                        </label>
                        <Select
                          value={tempFilters.season}
                          onValueChange={(val) => setTempFilters({...tempFilters, season: val})}
                        >
                          <SelectTrigger className={`w-full ${theme.input} transition-all duration-700`}>
                            <SelectValue placeholder="Select season" />
                          </SelectTrigger>
                          <SelectContent>
                            {seasons.map((s) => {
                              const Icon = seasonIcons[s];
                              return (
                                <SelectItem 
                                  key={s} 
                                  value={s}
                                  className="cursor-pointer"
                                >
                                  <div className="flex items-center gap-2">
                                    <Icon className="w-4 h-4" />
                                    <span>{s}</span>
                                  </div>
                                </SelectItem>
                              );
                            })}
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