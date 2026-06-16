import { create } from "zustand";
import type { Node } from "@xyflow/react";

type GraphStore = {
    nodes: Node[];
    setNodes: (nodes: Node[]) => void;

    updateNode: (
        nodeId: string,
        updates: Record<string, any>
    ) => void;
};

export const useGraphStore = create<GraphStore>(
    (set) => ({
        nodes: [],

        setNodes: (nodes) =>
            set({ nodes }),

        updateNode: (
            nodeId,
            updates
        ) =>
            set((state) => ({
                nodes: state.nodes.map(
                    (node) =>
                        node.id === nodeId
                            ? {
                                ...node,
                                data: {
                                    ...node.data,
                                    ...updates,
                                },
                            }
                            : node
                ),
            })),
    })
);