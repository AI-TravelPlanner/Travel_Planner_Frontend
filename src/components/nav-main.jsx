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
import CitySearch from "@/components/city-search";

import {
  setBudget,
  setHeadCount,
  setProvince,
  setSeason,
  setDate,
  setCity,
} from "@/redux-slices/filterSlice";

const provinces = [
  "Ontario",
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Nova Scotia",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Northwest Territories",
  "Nunavut",
  "Yukon",
];

const seasons = ["Spring", "Summer", "Autumn", "Winter"];

export function NavMain({ items }) {
  const dispatch = useDispatch();
  const { budget, headCount, province, season, date, city } = useSelector(
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
                  {/* Members */}
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

                  {/* Budget */}
                  {item.title === "Budget" && (
                    <SidebarMenuSubItem>
                      <div className="flex flex-col gap-3">
                        <label className="text-sm font-medium">
                          Create Budget
                        </label>
                        <BudgetSlider
                          value={[minBudget, maxBudget]}
                          onValueChange={([newMin, newMax]) => {
                            if (newMin <= newMax)
                              dispatch(setBudget([newMin, newMax]));
                          }}
                          max={50000}
                          step={1000}
                        />

                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 w-full">
                            <span className="text-sm text-muted-foreground">
                              $
                            </span>
                            <Input
                              type="number"
                              value={minBudget}
                              onChange={(e) => {
                                const val = Number(e.target.value);
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

                          <div className="flex items-center gap-1 w-full">
                            <span className="text-sm text-muted-foreground">
                              $
                            </span>
                            <Input
                              type="number"
                              value={maxBudget}
                              onChange={(e) => {
                                const val = Number(e.target.value);
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

                  {/* Calendar */}
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

                  {/* Province & City */}
                  {item.title === "Province" && (
                    <SidebarMenuSubItem>
                      <div className="flex flex-col gap-4">
                        {/* Province dropdown */}
                        <div>
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

                        {/* City Search */}
                        <div>
                          <label className="text-sm font-medium">
                            Search City
                          </label>
                          <CitySearch
                            apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
                            value={city || ""}
                            onSelect={(val) => {
                              if (val.cityFull) {
                                dispatch(setCity(val.city));
                                dispatch(setProvince(val.province));
                              }
                            }}
                          />
                        </div>
                      </div>
                    </SidebarMenuSubItem>
                  )}

                  {/* Seasons */}
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
