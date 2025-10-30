import React from 'react'
import { useSortable, defaultAnimateLayoutChanges } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { AttractionItem } from '@/components/AttractionItem'
import { useSelector } from 'react-redux'

export default function SortableItem({ id, boardId, isAnyDragging }) {
    const selectedTrip = useSelector((state) => state.trips.selectedTrip)
    const activity = selectedTrip?.itinerary?.find(item => item.id === id)

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
        isOver
    } = useSortable({
        id,
        data: {
            type: 'item',
            boardId: boardId,
        },
        animateLayoutChanges: (args) =>
            defaultAnimateLayoutChanges({ ...args, wasDragging: true }),
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: isDragging ? 'transform 250ms ease' : transition,
        border: isOver ? '2px solid #007bff' : '1px solid #ccc',
        borderRadius: '8px',
        background: isDragging ? '#f0f0f0' : (isOver ? '#f0f8ff' : 'white'),
        cursor: isDragging ? 'grabbing' : 'grab',
        boxSizing: 'border-box',
        position: 'relative',
    }

    if (!activity) {
        return null
    }

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={{ ...style, touchAction: 'none' }}
            data-item-id={id}
        >
            <AttractionItem
                image={activity.image}
                duration={activity.duration}
                timeline={activity.duration}
                timeOfDay={activity.timeOfDay}
                location={activity.location}
                description={activity.description}
                title={activity.name}
                isDragging={isDragging || isAnyDragging}
            />
        </div>
    )
}