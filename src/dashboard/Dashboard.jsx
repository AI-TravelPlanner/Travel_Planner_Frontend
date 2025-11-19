import React from 'react';
import { AppSidebar } from "@/components/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import DragAndDrop from '@/kanban-feature/DragAndDrop';
import TemplateBoardList from '@/kanban-feature/template-board-suggestions/TemplateBoard';
import { SeasonProvider, useSeason } from './SeasonThemeSystem';
import SeasonalAnimations from '@/animations/SeasonalAnimations';
import { Flower2, Sun, Leaf, Snowflake } from 'lucide-react';

// Season icon mapping
const seasonIcons = {
    spring: Flower2,
    summer: Sun,
    autumn: Leaf,
    winter: Snowflake,
};

function DashboardContent() {
    const { theme, season } = useSeason();
    const SeasonIcon = seasonIcons[season];
    
    return (
        <div style={{ position: 'relative', zIndex: 1 }}>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset 
                    className={`flex h-screen w-full flex-col overflow-hidden ${theme.bg} transition-all duration-700`}
                    style={{
                        '--kanban-card-w-base': '200px',
                        '--kanban-card-h-base': '240px',
                    }}>
                    <div className="flex items-center gap-2 p-2">
                        <SidebarTrigger className="-ml-1" />
                        
                        {/* Season icon only */}
                        <div className="ml-auto">
                            <SeasonIcon className={`w-6 h-6 ${theme.accentText}`} />
                        </div>
                    </div>

                    <div className="shrink-0 p-4">
                        <div className="grid auto-rows-min gap-2 px-10 md:grid-cols-1">
                            <div className={`w-full ${theme.muted} aspect-[16/2] rounded-xl border-2 ${theme.mutedBorder} transition-all`}>
                                <DragAndDrop />
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 thin-scrollbar">
                        <TemplateBoardList />
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
}

export default function Dashboard() {
    return (
        <SeasonProvider>
            <SeasonalAnimations />
            <DashboardContent />
        </SeasonProvider>
    );
}