import { useState } from "react"
import { addDays } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function DateRangePicker() {
  const today = new Date()
  const [date, setDate] = useState({
    from: today,
    to: addDays(today, 3),
  })

  const handleCalendarChange = (value, onChange) => {
    const event = { target: { value } }
    onChange(event)
  }

  return (
    <div>
      <Calendar
        mode="range"
        selected={date}
        onSelect={setDate}
        className="rounded-md border p-1 text-xs w-fit"
        classNames={{
          months: "flex flex-col space-y-1 text-xs",
          caption: "flex justify-center pt-1 pb-1 text-xs",
          caption_label: "text-xs font-medium",
          nav_button: "h-6 w-6 text-xs",
          table: "w-full border-collapse text-xs",
          head_cell: "text-[10px] font-medium text-muted-foreground",
          day: "h-6 w-6 p-0 text-xs font-normal",
        }}
        captionLayout="dropdown"
        defaultMonth={new Date()}
        startMonth={new Date(1980, 6)}
        hideNavigation
        components={{
          DropdownNav: (props) => (
            <div className="flex w-full items-center gap-1 text-xs">
              {props.children}
            </div>
          ),
          Dropdown: (props) => (
            <Select
              value={String(props.value)}
              onValueChange={(value) => {
                if (props.onChange) handleCalendarChange(value, props.onChange)
              }}
            >
              <SelectTrigger className="h-6 w-fit px-1 py-0 text-xs font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-[10rem] text-xs">
                {props.options?.map((option) => (
                  <SelectItem
                    className="text-xs py-0.5"
                    key={option.value}
                    value={String(option.value)}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ),
        }}
      />
      {/* <p
        className="mt-4 text-center text-xs text-muted-foreground"
        role="region"
        aria-live="polite"
      >
        Monthly / yearly selects –{" "}
        <a
          className="underline hover:text-foreground"
          href="https://daypicker.dev/"
          target="_blank"
          rel="noopener nofollow"
        >
          React DayPicker
        </a>
      </p> */}
    </div>
  )
}
