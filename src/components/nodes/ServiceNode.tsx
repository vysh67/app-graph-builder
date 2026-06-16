import { Handle, Position } from "@xyflow/react";

type ServiceNodeProps = {
    data: {
        label: string;
        status: string;
        cpu: number;
    };
};

export default function ServiceNode({
                                        data,
                                    }: ServiceNodeProps) {
    const statusColor =
        data.status === "healthy"
            ? "bg-green-500"
            : data.status === "down"
                ? "bg-red-500"
                : "bg-yellow-500";

    return (
        <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 min-w-[220px] shadow-lg">
            <Handle
                type="target"
                position={Position.Top}
            />

            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-white">
                    {data.label}
                </h3>

                <div
                    className={`w-3 h-3 rounded-full ${statusColor}`}
                />
            </div>

            <div className="mt-3 text-xs text-zinc-400">
                CPU Usage
            </div>

            <div className="text-sm text-white">
                {data.cpu}%
            </div>

            <div className="mt-3">
                <span className="text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-300">
                    {data.status}
                </span>
            </div>

            <Handle
                type="source"
                position={Position.Bottom}
            />
        </div>
    );
}