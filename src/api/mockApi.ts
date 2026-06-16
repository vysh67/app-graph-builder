import type { Node, Edge } from "@xyflow/react";

export const apps = [
    {
        id: "app-1",
        name: "supertokens-java",
    },
    {
        id: "app-2",
        name: "supertokens-python",
    },
    {
        id: "app-3",
        name: "supertokens-go",
    },
];

type GraphData = {
    nodes: Node[];
    edges: Edge[];
};

const graphs = {
    "app-1": {
        nodes: [
            {
                id: "1",
                type: "service",
                position: {
                    x: 100,
                    y: 100,
                },
                data: {
                    label: "Java API",
                    status: "healthy",
                    cpu: 40,
                },
            },
            {
                id: "2",
                type: "service",
                position: {
                    x: 500,
                    y: 100,
                },
                data: {
                    label: "PostgreSQL",
                    status: "healthy",
                    cpu: 55,
                },
            },
            {
                id: "3",
                type: "service",
                position: {
                    x: 300,
                    y: 350,
                },
                data: {
                    label: "Redis",
                    status: "healthy",
                    cpu: 20,
                },
            },
        ],

        edges: [
            {
                id: "e1-2",
                source: "1",
                target: "2",
            },
            {
                id: "e1-3",
                source: "1",
                target: "3",
            },
        ],
    },

    "app-2": {
        nodes: [
            {
                id: "1",
                type: "service",
                position: {
                    x: 100,
                    y: 100,
                },
                data: {
                    label: "Python API",
                    status: "healthy",
                    cpu: 30,
                },
            },
            {
                id: "2",
                type: "service",
                position: {
                    x: 500,
                    y: 100,
                },
                data: {
                    label: "PostgreSQL",
                    status: "down",
                    cpu: 70,
                },
            },
        ],

        edges: [
            {
                id: "e1-2",
                source: "1",
                target: "2",
            },
        ],
    },

    "app-3": {
        nodes: [
            {
                id: "1",
                type: "service",
                position: {
                    x: 100,
                    y: 100,
                },
                data: {
                    label: "Go Service",
                    status: "healthy",
                    cpu: 20,
                },
            },
            {
                id: "2",
                type: "service",
                position: {
                    x: 500,
                    y: 100,
                },
                data: {
                    label: "Redis",
                    status: "healthy",
                    cpu: 50,
                },
            },
        ],

        edges: [
            {
                id: "e1-2",
                source: "1",
                target: "2",
            },
        ],
    },
};

export const getApps = async () => {
    await new Promise((resolve) =>
        setTimeout(resolve, 1000)
    );

    return apps;
};

export const getGraph = async (
    appId: string
): Promise<GraphData> => {
    await new Promise((resolve) =>
        setTimeout(resolve, 1000)
    );

    return graphs[
        appId as keyof typeof graphs
        ] as GraphData;
};