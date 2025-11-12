import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTemplateToKanbanAndRemove } from './thunk';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import GenerateDayOptionsButton from '@/naz-button-daily/demo';

// ---------------- Template Card ----------------

const TemplateCard = ({ template }) => {
    const dispatch = useDispatch();
    const allItems = useSelector(state => state.aliasTemplates.items);

    return (
        <Card className="h-full w-full overflow-hidden rounded-2xl shadow-lg p-2 transition-transform duration-200 transform-gpu hover:scale-[1.01]">
            <CardHeader className="flex justify-between px-3 py-2">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => dispatch(addTemplateToKanbanAndRemove(template))}
                    title="Add to Kanban Board"
                    className="h-8 w-8"
                >
                    <Plus className="h-4 w-4" />
                </Button>
            </CardHeader>

            <CardContent className="px-4 pb-4 pt-0 min-h-0">
                <div className="flex h-full flex-col space-y-2 overflow-hidden">
                    {template.items.length === 0 ? (
                        <div className="mt-2 text-sm text-muted-foreground italic">
                            No items yet
                        </div>
                    ) : (
                        template.items.map(itemId => {
                            const item = allItems?.[itemId];
                            return (
                                <div
                                    key={itemId}
                                    className="truncate rounded-md bg-muted px-3 py-1 text-sm"
                                    title={item?.title || 'Item'}
                                >
                                    {item?.title || 'Item'}
                                </div>
                            );
                        })
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
        // The outer wrapper just provides spacing; no bg/shadow here
        <div className="h-full w-full">
            {/* Panel that always encapsulates the whole list */}
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md p-5 w-full min-w-0 overflow-visible">
                <div className="relative flex items-center w-full">
                    <div className="absolute left-0">
                        <GenerateDayOptionsButton />
                    </div>
                    <h2 className="mx-auto text-xl font-bold">Extra Day Plans</h2>
                </div>


                {availableTemplates.length === 0 ? (
                    <p className="text-muted-foreground">No templates available.</p>
                ) : (
                    <div
                        className="
              mt-3 grid gap-4
              grid-cols-[repeat(auto-fill,minmax(var(--kanban-card-w-base),_1fr))]
              auto-rows-[var(--kanban-card-h-base)]
              w-full
            "
                    >
                        {availableTemplates.map(template => (
                            <TemplateCard key={template.id} template={template} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TemplateBoardList;
