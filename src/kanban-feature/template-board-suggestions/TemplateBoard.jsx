import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTemplateToKanbanAndRemove } from './thunk';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import GenerateDayOptionsButton from '@/naz-button-daily/GenerateDayOptionsButton';

// ---------------- Template Card ----------------

const TemplateCard = ({ template }) => {
    const dispatch = useDispatch();
    const allItems = useSelector(state => state.aliasTemplates.items);

    return (
        <Card className="group relative flex flex-col h-full w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/30">
            
            {/* Floating Action Button (Top Right) */}
            <div className="absolute top-2 right-2 z-10">
                <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => dispatch(addTemplateToKanbanAndRemove(template))}
                    title="Add to Kanban Board"
                    className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-sm hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
                >
                    <Plus className="h-4 w-4" />
                </Button>
            </div>

            <CardContent className="flex-1 p-3 pt-4 overflow-hidden">
                <div className="h-full flex flex-col">
                    {template.items.length === 0 ? (
                        <div className="flex h-full items-center justify-center text-xs text-muted-foreground italic">
                            No items
                        </div>
                    ) : (
                        // List Container: Scrollable with a clean scrollbar
                        <div className="flex flex-col gap-2 h-full overflow-y-auto pr-1 scrollbar-none">
                            {template.items.map(itemId => {
                                const item = allItems?.[itemId];
                                return (
                                    <div
                                        key={itemId}
                                        className="
                                            flex items-center gap-2 
                                            rounded-lg bg-muted/40 px-3 py-2.5 
                                            text-xs font-medium text-foreground 
                                            border border-transparent
                                            transition-all duration-200
                                            hover:bg-background hover:border-border hover:shadow-sm
                                        "
                                        title={item?.title || 'Item'}
                                    >
                                        {/* Visual Indicator Dot */}
                                        <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50 group-hover:bg-primary" />
                                        
                                        <span className="truncate">
                                            {item?.title || 'Item'}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

// --- Main List (grid uses the same vars) ---
const TemplateBoardList = () => {
    const availableTemplates = useSelector(state => state.aliasTemplates.availableTemplates);
return (
    <div className="h-full w-full p-1">
        {/* Main Container: Added border and softer shadow for depth */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm w-full flex flex-col h-full overflow-hidden">
            
            {/* --- 1. Header Section --- */}
            {/* Changed from absolute positioning to Flexbox for stable alignment */}
            <div className="px-6 py-4 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between bg-gray-50/30 dark:bg-zinc-900/30">
                <div>
                    <h2 className="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">
                        Extra Day Plans
                    </h2>
                    <p className="text-xs text-muted-foreground hidden sm:block">
                        Generated itineraries ready to use
                    </p>
                </div>
                
                {/* Button stays on the right (or left if you prefer, but right is standard for actions) */}
                <div className="shrink-0">
                    <GenerateDayOptionsButton />
                </div>
            </div>

            {/* --- 2. Content Section --- */}
            <div className="p-6 overflow-y-auto">
                {availableTemplates.length === 0 ? (
                    
                    // --- Visual Empty State ---
                    <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-gray-200 dark:border-zinc-700 rounded-xl bg-gray-50/50 dark:bg-zinc-800/50">
                        <div className="p-3 bg-white dark:bg-zinc-900 rounded-full shadow-sm mb-3">
                             {/* Simple placeholder icon (can import LayoutDashboard from lucide-react) */}
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
                        </div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            No templates available
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                            Generate new options to see them here.
                        </p>
                    </div>

                ) : (
                    
                    // --- Standard Responsive Grid ---
                    // Replaced variable-based grid with Tailwind standard classes
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {availableTemplates.map(template => (
                            // Wrapper div ensures consistent height matching
                            <div key={template.id} className="h-full min-h-[160px]">
                                <TemplateCard template={template} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </div>
);
};

export default TemplateBoardList;
