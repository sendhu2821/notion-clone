"use client";
import { LiveblocksProvider } from "@liveblocks/react/suspense";

const LiveBlockProvider = ({ children }: { children: React.ReactNode }) => {
  if (!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLISHABLE_KEY) {
    throw new Error("NEXT_PUBLIC_LIVEBLOCKS_PUBLISHABLE_KEY is not set");
  }

  return (
    <LiveblocksProvider throttle={16} authEndpoint={"/auth-endpoint"}>
      {children}
    </LiveblocksProvider>
  );
};
export default LiveBlockProvider;
