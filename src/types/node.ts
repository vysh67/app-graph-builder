export type NodeStatus =
    | "healthy"
    | "degraded"
    | "down";

export type ServiceNodeData = {
    label: string;
    status: NodeStatus;
    cpu: number;
    description?: string;
};