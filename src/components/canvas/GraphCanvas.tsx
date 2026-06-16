import {
    Background,
    Controls,
    MiniMap,
    ReactFlow,
    ReactFlowProvider,
    useEdgesState,
    useNodesState,
    useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import type { Node, Edge } from "@xyflow/react";
import { useEffect } from "react";

import { useAppStore } from "@/store/useAppStore";
import { useGraphStore } from "@/store/useGraphStore";
import { useGraph } from "@/hooks/useGraph";

import ServiceNode from "@/components/nodes/ServiceNode";

const nodeTypes = {
    service: ServiceNode,
};

function GraphCanvasContent() {
    const { fitView } = useReactFlow();

    const selectedNodeId = useAppStore(
        (state) => state.selectedNodeId
    );

    const setSelectedNodeId = useAppStore(
        (state) => state.setSelectedNodeId
    );

    const selectedAppId = useAppStore(
        (state) => state.selectedAppId
    );

    const fitViewTrigger = useAppStore(
        (state) => state.fitViewTrigger
    );

    const setStoreNodes = useGraphStore(
        (state) => state.setNodes
    );



    const {
        data,
        isLoading,
        isError,
    } = useGraph(selectedAppId);

    const [nodes, setNodes, onNodesChange] =
        useNodesState<Node>([]);

    const [edges, setEdges, onEdgesChange] =
        useEdgesState<Edge>([]);

    // Load graph from API
    useEffect(() => {
        if (!data) return;

        setNodes(data.nodes ?? []);
        setEdges(data.edges ?? []);

        setTimeout(() => {
            fitView({
                duration: 500,
                padding: 0.2,
            });
        }, 100);
    }, [
        data,
        setNodes,
        setEdges,
        fitView,
    ]);

    // Top bar Fit View button
    useEffect(() => {
        fitView({
            duration: 500,
            padding: 0.2,
        });
    }, [fitViewTrigger, fitView]);

    // Sync ReactFlow -> Zustand
    useEffect(() => {
        setStoreNodes(nodes);
    }, [nodes, setStoreNodes]);



    // Delete selected node
    useEffect(() => {
        const handleKeyDown = (
            event: KeyboardEvent
        ) => {
            const target =
                event.target as HTMLElement;

            if (
                target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA"
            ) {
                return;
            }

            if (event.key !== "Delete") {
                return;
            }

            if (!selectedNodeId) {
                return;
            }

            setNodes((currentNodes) =>
                currentNodes.filter(
                    (node) =>
                        node.id !==
                        selectedNodeId
                )
            );

            setEdges((currentEdges) =>
                currentEdges.filter(
                    (edge) =>
                        edge.source !==
                        selectedNodeId &&
                        edge.target !==
                        selectedNodeId
                )
            );

            setSelectedNodeId(null);
        };

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [
        selectedNodeId,
        setNodes,
        setEdges,
        setSelectedNodeId,
    ]);

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center text-white">
                Loading graph...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="h-full flex items-center justify-center text-red-500">
                Failed to load graph
            </div>
        );
    }

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
            onNodeClick={(_, node) =>
                setSelectedNodeId(node.id)
            }
        >
            <Background
                color="#52525b"
                gap={32}
                size={1.5}
            />

            <Controls />

            <MiniMap />
        </ReactFlow>
    );
}

export default function GraphCanvas() {
    return (
        <ReactFlowProvider>
            <GraphCanvasContent />
        </ReactFlowProvider>
    );
}