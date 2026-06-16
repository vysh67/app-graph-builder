import GraphCanvas from "@/components/canvas/GraphCanvas";
import NodeInspector from "@/components/inspector/NodeInspector";
import AppsPanel from "@/components/apps/AppsPanel";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

import { useAppStore } from "@/store/useAppStore";

import {
    Menu,
    Home,
    Workflow,
    Server,
    Settings,
} from "lucide-react";

export default function AppLayout() {
    const isMobilePanelOpen = useAppStore(
        (state) => state.isMobilePanelOpen
    );

    const triggerFitView = useAppStore(
        (state) => state.triggerFitView
    );

    const setMobilePanelOpen = useAppStore(
        (state) => state.setMobilePanelOpen
    );

    return (
        <div className="h-screen flex flex-col bg-zinc-950 text-white">
            {/* Top Bar */}
            <header className="h-14 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-4">
                <div className="font-semibold">
                    ⚡ App Graph Builder
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={triggerFitView}
                    >
                        Fit View
                    </Button>

                    {/* Mobile Drawer Button */}
                    <div className="md:hidden">
                        <Sheet
                            open={
                                isMobilePanelOpen
                            }
                            onOpenChange={
                                setMobilePanelOpen
                            }
                        >
                            <SheetTrigger
                                asChild
                            >
                                <Button
                                    size="icon"
                                    variant="outline"
                                >
                                    <Menu className="h-4 w-4" />
                                </Button>
                            </SheetTrigger>

                            <SheetContent
                                side="right"
                                className="p-0"
                            >
                                <div className="h-full flex flex-col">
                                    <AppsPanel />
                                    <div className="flex-1">
                                        <NodeInspector />
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Left Rail */}
                <aside className="hidden md:flex w-16 border-r flex-col items-center py-4 gap-6">
                    <Home className="h-5 w-5" />

                    <Workflow className="h-5 w-5" />

                    <Server className="h-5 w-5" />

                    <Settings className="h-5 w-5" />
                </aside>

                {/* Canvas */}
                <main className="flex-1 h-full">
                    <GraphCanvas />
                </main>

                {/* Desktop Right Panel */}
                <aside className="hidden md:flex w-80 border-l flex-col">
                    <AppsPanel />

                    <div className="flex-1">
                        <NodeInspector />
                    </div>
                </aside>
            </div>
        </div>
    );
}