import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

import { useAppStore } from "@/store/useAppStore";
import { useGraphStore } from "@/store/useGraphStore";

export default function NodeInspector() {
    const selectedNodeId = useAppStore(
        (state) => state.selectedNodeId
    );
    const updateNode = useGraphStore(
        (state) => state.updateNode
    );
    const nodes = useGraphStore(
        (state) => state.nodes
    );

    const selectedNode = nodes.find(
        (node) => node.id === selectedNodeId
    );

    const [cpu, setCpu] = useState<number>(
        Number(selectedNode?.data?.cpu ?? 0)
    );

    if (!selectedNode) {
        return (
            <div className="p-4">
                Select a node
            </div>
        );
    }

    return (
        <div className="h-full p-4 overflow-y-auto">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
                <h2 className="text-2xl font-bold text-white mb-2">
                Service Node
            </h2>

            <p className="text-sm text-muted-foreground mb-2">
                Selected Node: {String(selectedNode.data.label)}
            </p>

                <Badge
                    className="
                        mb-4
                        bg-green-500/20
                        text-green-400
                        border-green-500/30
                    "
                >
                    ● Healthy
                </Badge>

            <Tabs defaultValue="config">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="config">
                        Config
                    </TabsTrigger>

                    <TabsTrigger value="runtime">
                        Runtime
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="config">
                    <div className="space-y-4 mt-4">

                        <div>
                            <label className="text-sm font-medium text-zinc-300">
                                Node Name
                            </label>

                            <Input
                                value={String(selectedNode.data.label)}
                                onChange={(e) =>
                                    updateNode(
                                        selectedNode.id,
                                        {
                                            label: e.target.value,
                                        }
                                    )
                                }
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                CPU Allocation
                            </label>

                            <div className="flex gap-3 items-center mt-2">
                                <Slider
                                    className="w-full"
                                    value={[cpu]}
                                    max={100}
                                    onValueChange={(value) => {
                                        setCpu(value[0]);

                                        updateNode(
                                            selectedNode.id,
                                            {
                                                cpu: value[0],
                                            }
                                        );
                                    }}
                                />

                                <Input
                                    type="number"
                                    value={cpu}
                                    onChange={(e) => {
                                        const value =
                                            Number(e.target.value);

                                        setCpu(value);

                                        updateNode(
                                            selectedNode.id,
                                            {
                                                cpu: value,
                                            }
                                        );
                                    }}
                                    className="w-20"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Description
                            </label>

                            <Textarea
                                placeholder="Service description"
                            />
                        </div>

                    </div>
                </TabsContent>

                <TabsContent value="runtime">
                    <div className="space-y-4 mt-4">

                        <p>
                            Status: {String(selectedNode.data.status)}
                        </p>

                        <p>
                            Uptime: 99.9%
                        </p>

                        <p>
                            Memory Usage: 512 MB
                        </p>

                    </div>
                </TabsContent>
            </Tabs>
        </div>
        </div>
    );
}