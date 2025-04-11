"use client";

import { useMyPresence, useOthers } from "@liveblocks/react/suspense";
import { PointerEvent } from "react";
import FollowPointer from "./FollowPointer";

const LiveCursorProvider = ({ children }: { children: React.ReactNode }) => {
  const [myPresence, updateMyPresence] = useMyPresence();
  const others = useOthers();

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    //  using pageX, pageY to support full page cursor tracking
    const cursor = {
      x: Math.floor(e.pageX),
      y: Math.floor(e.pageY),
    };

    updateMyPresence({ cursor });
  };

  const handlePointerLeave = () => {
    updateMyPresence({ cursor: null });
  };

  return (
    <div
      className="min-h-screen"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
      {others
        .filter((other) => other.presence.cursor !== null)
        .map(({ connectionId, presence, info }) => (
          <FollowPointer
            key={connectionId}
            info={info}
            x={presence.cursor?.x ?? 0}
            y={presence.cursor?.y ?? 0}
          />
        ))}
    </div>
  );
};
export default LiveCursorProvider;
