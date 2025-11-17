"use client";

import { useSelector, useDispatch } from "react-redux";
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

import {
  setBudget,
  setHeadCount,
  setProvince,
  setSeason,
  setDate,
} from "@/redux-slices/filterSlice";

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
  const dispatch = useDispatch();
  const { budget, headCount, province, season, date } = useSelector(
    (state) => state.filter
  );
  const [minBudget, maxBudget] = budget;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Filter</SidebarGroupLabel>
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
                        <HeadCount
                          value={headCount}
                          onChange={(val) => dispatch(setHeadCount(val))}
                        />
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  )}

                  {/* Budgets Section */}
                  {item.title === "Budget" && (
                    <SidebarMenuSubItem>
                      <div className="flex flex-col gap-3">
                        <label className="text-sm font-medium">
                          Create Budget
                        </label>

                        {/* Range Slider */}
                        <BudgetSlider
                          value={[minBudget, maxBudget]}
                          onValueChange={([newMin, newMax]) => {
                            // Ensure min is not greater than max
                            if (newMin <= newMax)
                              dispatch(setBudget([newMin, newMax]));
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
                              onChange={(e) => {
                                let val = Number(e.target.value);
                                if (val >= 0 && val <= maxBudget)
                                  dispatch(setBudget([val, maxBudget]));
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
                              onChange={(e) => {
                                let val = Number(e.target.value);
                                if (val >= minBudget && val <= 50000)
                                  dispatch(setBudget([minBudget, val]));
                              }}
                              min={minBudget}
                              max={50000}
                            />
                          </div>
                        </div>

                        <p className="text-xs text-muted-foreground">
                          Adjust your budget range
                        </p>
                      </div>
                    </SidebarMenuSubItem>
                  )}

                  {/* Calendar Section */}
                  {item.title === "Calendar" && (
                    <SidebarMenuSubItem>
                      <div className="flex flex-col gap-3 w-full">
                        <label className="text-sm font-medium">
                          Select Date
                        </label>
                        <DateRangePicker
                          mode="single"
                          selected={date || null}
                          onSelect={(val) => {
                            if (val) dispatch(setDate(val));
                          }}
                          className="w-full rounded-md border px-2 py-1"
                          placeholder="Select a date"
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
                        <Select
                          value={province}
                          onValueChange={(val) => dispatch(setProvince(val))}
                        >
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
                        <Select
                          value={season}
                          onValueChange={(val) => dispatch(setSeason(val))}
                        >
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
