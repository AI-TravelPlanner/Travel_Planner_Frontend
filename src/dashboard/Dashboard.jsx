import React from 'react';

import { AppSidebar } from "@/components/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import DragAndDrop from '@/kanban-feature/DragAndDrop';
import TemplateBoardList from '@/kanban-feature/template-board-suggestions/TemplateBoard';

export default function Dashboard() {
    return (
        <SidebarProvider>
            <AppSidebar />
            {/* Make the main column fill the viewport and prevent page scroll */}
            <SidebarInset className="flex h-screen w-full flex-col overflow-hidden"
                style={{
                    // Single source of truth for sizes:
                    // tweak these to resize every card everywhere
                    '--kanban-card-w-base': '200px',
                    '--kanban-card-h-base': '240px',
                }}>
                <div className="flex items-center gap-2 p-2">
                    <SidebarTrigger className="-ml-1" />
                </div>

                {/* Top block: not scrollable, sticks because below container scrolls */}
                <div className="shrink-0 p-4">
                    <div className="grid auto-rows-min gap-2 px-10 md:grid-cols-1">
                        <div className="w-full bg-muted/50 aspect-[16/2] rounded-xl">
                            <DragAndDrop />
                        </div>
                    </div>
                </div>

                {/* Only this area scrolls */}
                <div className="flex-1 overflow-y-auto p-4 thin-scrollbar">
                    <TemplateBoardList />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

