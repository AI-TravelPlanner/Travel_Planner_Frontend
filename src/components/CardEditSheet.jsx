import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2, CalendarDays, CloudSun } from "lucide-react"
import { format, parseISO } from "date-fns"

import {
    addAttractionToBoard,
    updateBoardHotel,
    updateAttractionItem,
} from "../redux-slices/boardSlice"
import { toast } from "sonner"

/* ---------- Small preview item (read-only) ---------- */
const PreviewItem = ({ image, title, duration, timeline, timeOfDay }) => (
    <div
        className="flex items-center gap-2 py-2"
    >
        <div className="flex-shrink-0">
            <img
                src={image || "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"}
                alt={title}
                className="w-12 h-12 rounded-full object-cover"
            />
        </div>

        {/* Text block */}
        <div className="flex flex-col min-w-0">
            {/* Title – up to 2 lines */}
            <p className="text-[13px] font-medium leading-tight line-clamp-2 break-words">
                {title || "Untitled attraction"}
            </p>

            {/* Duration + Timeline (left/right) */}
            <div className="mt-0.5 grid grid-cols-3 text-[11px] text-gray-500">
                <p className="whitespace-nowrap overflow-hidden text-ellipsis text-left">
                    {duration}
                </p>
                <p className="whitespace-nowrap overflow-hidden text-ellipsis text-left">
                    {timeOfDay}
                </p>
                <p className="whitespace-nowrap overflow-hidden text-ellipsis text-right">
                    {timeline}
                </p>
            </div>
        </div>
    </div>
)

/* ---------- Full day preview (card) ---------- */
const DayCardPreview = ({ hotel, items }) => (
    <Card className="overflow-hidden rounded-2xl shadow-sm py-0 gap-2">
        <div className="h-28 w-full ">
            <img
                src={hotel?.placeDetails?.photoUrls?.[0] || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop"}
                alt="Cover"
                className="h-full w-full object-cover"
            />
        </div>
        <CardContent className="px-4">
            <div>
                {items.length === 0 ? (
                    <div className="text-sm italic text-muted-foreground py-4">
                        No attractions yet
                    </div>
                ) : (
                    items.slice(0, 3).map((it) => <PreviewItem key={it.id} {...it} />)
                )}
            </div>
        </CardContent>
    </Card>
)

/* ---------- Day meta bar: date + weather ---------- */
const DayMetaBar = ({ date, weather }) => {
    if (!date && !weather) return null

    let dateLabel = null
    if (date) {
        try {
            const d = typeof date === "string" ? parseISO(date) : date
            dateLabel = format(d, "EEE, MMM d, yyyy")
        } catch {
            // ignore parse errors
        }
    }

    return (
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {dateLabel && (
                <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5">
                    <CalendarDays className="h-3 w-3" />
                    <span>{dateLabel}</span>
                </span>
            )}

            {weather && (
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-blue-700">
                    <CloudSun className="h-3 w-3" />
                    <span>
                        {weather.temperature}°C · {weather.condition}
                    </span>
                </span>
            )}
        </div>
    )
}

/* ---------- Hotel details card (right column) ---------- */
const HotelInfoCard = ({ hotel }) => {
    if (!hotel) return null

    const pd = hotel.placeDetails || {}
    const image =
        pd.photoUrls?.[0] ||
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop"

    return (
        <Card className="overflow-hidden rounded-2xl border border-muted">
            <CardContent className="p-3 space-y-2">
                <div className="flex gap-3">
                    <img
                        src={image}
                        alt={hotel.hotelName || "Hotel"}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                        <p className="font-semibold text-sm">
                            {hotel.hotelName || "No Hotel Assigned"}
                        </p>

                        {(pd.rating || hotel.pricePerNight != 0) && (
                            <p className="text-xs text-muted-foreground mt-1">
                                {pd.rating && <>⭐ {pd.rating.toFixed(1)}</>}
                                {pd.rating && hotel.pricePerNight && " · "}
                                {hotel.pricePerNight &&
                                    `$${hotel.pricePerNight} / night`}
                            </p>
                        )}
                    </div>
                </div>

                {pd.website && (
                    <a
                        href={pd.website}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center text-xs text-blue-600 hover:underline break-all"
                    >
                        Visit website
                    </a>
                )}
                <p className="text-xs text-muted-foreground">
                    {pd.formattedAddress || hotel.location || "Location not specified"}
                </p>
            </CardContent>
        </Card>
    )
}

/* ---------- Main sheet component ---------- */
export const CardEditSheet = ({ open, onOpenChange, board }) => {
    const [hotelSavedAt, setHotelSavedAt] = useState(null)

    useEffect(() => {
        if (!hotelSavedAt) return
        const id = setTimeout(() => setHotelSavedAt(null), 1800)
        return () => clearTimeout(id)
    }, [hotelSavedAt])

    const dispatch = useDispatch()
    const itemsById = useSelector((s) => s.boards.itemsById)

    // hotel + attraction form state
    const [hotelName, setHotelName] = useState(board.hotelName || "")
    const [selectedItemId, setSelectedItemId] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState({
        title: "",
        duration: "",
        timeline: "",
        timeOfDay: "",
        location: "",
        description: "",
        image: "",
    })

    useEffect(() => {
        if (open) setHotelName(board.hotelName || "")
    }, [open, board.hotelName])

    const boardItems = useMemo(
        () => board.items.map((id) => itemsById[id]).filter(Boolean),
        [board.items, itemsById]
    )

    const saveHotel = () => {
        dispatch(updateBoardHotel({ boardId: board.id, hotelName }))
        setHotelSavedAt(Date.now())
        toast.success("Hotel saved", {
            description: "The hotel name was updated for this day.",
            duration: 1800,
        })
    }

    const startAddAttraction = () => {
        setSelectedItemId(null)
        setForm({
            title: "",
            duration: "",
            timeline: "",
            timeOfDay: "",
            location: "",
            description: "",
            image: "",
        })
        setShowForm(true)
    }

    const handlePickItemToEdit = (itemId) => {
        const it = itemsById[itemId]
        if (!it) return
        setSelectedItemId(itemId)
        setForm({
            title: it.title || "",
            duration: it.duration || "",
            timeline: it.timeline || "",
            timeOfDay: it.timeOfDay || "",
            location: it.location || "",
            description: it.description || "",
            image: it.image || "",
        })
        setShowForm(true)
    }

    const cancelForm = () => {
        setSelectedItemId(null)
        setShowForm(false)
    }

    const saveAttraction = () => {
        if (selectedItemId) {
            dispatch(
                updateAttractionItem({
                    itemId: selectedItemId,
                    updatedFields: { ...form },
                })
            )
        } else {
            dispatch(
                addAttractionToBoard({
                    boardId: board.id,
                    item: { ...form },
                })
            )
        }
        setSelectedItemId(null)
        setShowForm(false)
    }

    const previewItems = selectedItemId
        ? boardItems.map((it) =>
            it.id === selectedItemId ? { ...it, ...form } : it
        )
        : boardItems

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="right"
                className="w-full sm:max-w-[1080px] p-0"
                onMouseDown={(e) => e.stopPropagation()}
            >
                {/* Header + day meta */}
                <SheetHeader className="px-6 py-4 border-b">
                    <SheetTitle>Edit Day</SheetTitle>
                    <SheetDescription>
                        Manage hotel and attractions for this day. Changes save per action.
                    </SheetDescription>

                    <DayMetaBar date={board.date} weather={board.weather} />
                </SheetHeader>

                {/* Main three-pane grid */}
                <div className="grid grid-cols-12 gap-6 p-6 overflow-hidden">
                    {/* LEFT: Attractions list + hotel input */}
                    <div className="col-span-4 flex flex-col min-h-0">
                        <div className="flex items-end justify-between gap-2">
                            <div className="flex-1">
                                <Label htmlFor="hotelName" className="text-xs">
                                    Hotel
                                </Label>
                                <Input
                                    id="hotelName"
                                    value={hotelName}
                                    onChange={(e) => setHotelName(e.target.value)}
                                    placeholder="Hotel name"
                                />
                            </div>
                            <Button variant="secondary" onClick={saveHotel}>
                                Save
                            </Button>
                        </div>

                        <Separator className="my-4" />

                        <div className="flex items-center justify-between">
                            <h4 className="text-sm font-semibold">Attractions</h4>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={startAddAttraction}
                            >
                                <Plus className="mr-1 h-4 w-4" /> New
                            </Button>
                        </div>

                        <ScrollArea className="mt-2 rounded-md border h-[60vh]">
                            <div className="divide-y">
                                {boardItems.length === 0 ? (
                                    <div className="p-3 text-sm text-muted-foreground italic">
                                        No attractions yet
                                    </div>
                                ) : (
                                    boardItems.map((it) => (
                                        <button
                                            key={it.id}
                                            type="button"
                                            className={`w-full text-left p-3 transition-colors ${selectedItemId === it.id
                                                ? "bg-primary/5"
                                                : "hover:bg-muted"
                                                }`}
                                            onClick={() => handlePickItemToEdit(it.id)}
                                        >
                                            <div className="font-medium text-sm leading-snug break-words">
                                                {it.title || "Untitled attraction"}
                                            </div>
                                            <div className="text-xs text-muted-foreground mt-0.5 break-words">
                                                {(it.duration || "—")} · {(it.timeOfDay || "—")} ·{" "}
                                                {(it.location || "—")}
                                            </div>
                                        </button>
                                    ))
                                )}
                            </div>
                        </ScrollArea>
                    </div>

                    {/* MIDDLE: Edit form */}
                    <div className="col-span-5 min-h-0">
                        <div className="flex items-center justify-between">
                            <h4 className="text-sm font-semibold">
                                {showForm
                                    ? selectedItemId
                                        ? "Edit attraction"
                                        : "New attraction"
                                    : "Select an attraction"}
                            </h4>
                            {selectedItemId && (
                                <div className="text-xs text-muted-foreground">
                                    Editing: {selectedItemId}
                                </div>
                            )}
                        </div>

                        <div className="mt-3">
                            {showForm ? (
                                <ScrollArea className="h-[60vh] pr-2">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <Label htmlFor="title">Title</Label>
                                            <Input
                                                id="title"
                                                value={form.title}
                                                onChange={(e) =>
                                                    setForm({ ...form, title: e.target.value })
                                                }
                                                placeholder="e.g., Historical Landmark"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="location">Location</Label>
                                            <Input
                                                id="location"
                                                value={form.location}
                                                onChange={(e) =>
                                                    setForm({ ...form, location: e.target.value })
                                                }
                                                placeholder="City, district, venue"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="duration">Duration</Label>
                                            <Input
                                                id="duration"
                                                value={form.duration}
                                                onChange={(e) =>
                                                    setForm({ ...form, duration: e.target.value })
                                                }
                                                placeholder="e.g., 2 hours"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="timeline">Timeline</Label>
                                            <Input
                                                id="timeline"
                                                value={form.timeline}
                                                onChange={(e) =>
                                                    setForm({ ...form, timeline: e.target.value })
                                                }
                                                placeholder="e.g., 09:00–11:00"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label>Time of Day</Label>
                                            <Select
                                                value={form.timeOfDay || ""}
                                                onValueChange={(v) =>
                                                    setForm({ ...form, timeOfDay: v })
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select…" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Morning">Morning</SelectItem>
                                                    <SelectItem value="Afternoon">Afternoon</SelectItem>
                                                    <SelectItem value="Evening">Evening</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-1 md:col-span-2">
                                            <Label htmlFor="image">Image URL</Label>
                                            <Input
                                                id="image"
                                                value={form.image}
                                                onChange={(e) =>
                                                    setForm({ ...form, image: e.target.value })
                                                }
                                                placeholder="https://..."
                                            />
                                        </div>
                                        <div className="space-y-1 md:col-span-2">
                                            <Label htmlFor="description">Description</Label>
                                            <Textarea
                                                id="description"
                                                value={form.description}
                                                onChange={(e) =>
                                                    setForm({ ...form, description: e.target.value })
                                                }
                                                placeholder="Short overview of the attraction"
                                                className="min-h-[100px]"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-2 mt-4">
                                        <Button variant="outline" onClick={cancelForm}>
                                            Cancel
                                        </Button>
                                        <Button onClick={saveAttraction}>
                                            {selectedItemId ? "Save Changes" : "Add Attraction"}
                                        </Button>
                                    </div>
                                </ScrollArea>
                            ) : (
                                <div className="text-sm text-muted-foreground mt-2">
                                    Choose an attraction on the left or click{" "}
                                    <span className="font-medium">New</span>.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT: Live Preview + Hotel details */}
                    <div className="col-span-3">
                        <div className="xl:sticky xl:top-6 space-y-3">
                            <h4 className="text-sm font-semibold">Live Preview</h4>
                            <DayCardPreview hotel={board.hotel} items={previewItems} />
                            <HotelInfoCard hotel={board.hotel} />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <SheetFooter className="px-6 py-4 border-t">
                    <div className="ml-auto flex gap-2">
                        <Button variant="outline" onClick={() => onOpenChange(false)}>
                            Close
                        </Button>
                        <Button onClick={saveHotel}>Save Hotel</Button>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
