import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "./ai-now";
export const Route = createFileRoute("/key-players")({
  component: () => <ComingSoon index="§ 03" label="Key Players" en="Global AI Players" />,
});
