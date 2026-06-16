import { create } from "zustand";

type AppStore = {
    selectedAppId: string;
    selectedNodeId: string | null;
    isMobilePanelOpen: boolean;
    activeInspectorTab: string;

    fitViewTrigger: number;

    setSelectedAppId: (id: string) => void;
    setSelectedNodeId: (id: string | null) => void;
    setMobilePanelOpen: (open: boolean) => void;
    setActiveInspectorTab: (tab: string) => void;

    triggerFitView: () => void;
};

export const useAppStore = create<AppStore>((set) => ({
    selectedAppId: "app-1",
    selectedNodeId: null,
    isMobilePanelOpen: false,
    activeInspectorTab: "config",

    fitViewTrigger: 0,

    setSelectedAppId: (id) =>
        set({ selectedAppId: id }),

    setSelectedNodeId: (id) =>
        set({ selectedNodeId: id }),

    setMobilePanelOpen: (open) =>
        set({ isMobilePanelOpen: open }),

    setActiveInspectorTab: (tab) =>
        set({ activeInspectorTab: tab }),

    triggerFitView: () =>
        set((state) => ({
            fitViewTrigger:
                state.fitViewTrigger + 1,
        })),
}));