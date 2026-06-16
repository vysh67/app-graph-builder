import { useApps } from "@/hooks/useApps";
import { useAppStore } from "@/store/useAppStore";
import { Server } from "lucide-react";

export default function AppsPanel() {
    const { data, isLoading, isError } =
        useApps();

    const selectedAppId = useAppStore(
        (state) => state.selectedAppId
    );

    const setSelectedAppId = useAppStore(
        (state) => state.setSelectedAppId
    );

    if (isLoading) {
        return (
            <div className="p-4 text-zinc-400">
                Loading apps...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-4 text-red-500">
                Failed to load apps
            </div>
        );
    }

    return (
        <div className="p-4 border-b border-zinc-800">
            <h2 className="text-xl font-semibold text-white mb-4">
                Apps
            </h2>

            <div className="space-y-3">
                {data?.map((app) => (
                    <button
                        key={app.id}
                        onClick={() =>
                            setSelectedAppId(
                                app.id
                            )
                        }
                        className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 text-left ${
                            selectedAppId === app.id
                                ? "bg-blue-600 border-blue-500 text-white shadow-lg"
                                : "bg-zinc-900 border-zinc-700 text-white hover:bg-zinc-800"
                        }`}
                    >
                        <Server
                            size={18}
                        />

                        <span className="font-medium truncate">
                            {app.name}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}