import stringToColor from "@/lib/stringToColor";
import { motion } from "framer-motion";

const FollowPointer = ({
  x,
  y,
  info,
}: {
  x: number;
  y: number;
  info: {
    name: string;
    email: string;
    avatar: string;
  };
}) => {
  const color = stringToColor(info.email || "1");

  console.log("FollowPointer rendered at:", x, y, info);

  return (
    <motion.div
      className="absolute z-50 pointer-events-none"
      style={{
        top: y,
        left: x,
      }}
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      <svg
        stroke={color}
        fill={color}
        strokeWidth="1"
        viewBox="0 0 16 16"
        className="h-6 w-6 transform -rotate-[70deg] -translate-x-[12px] -translate-y-[10px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916L13.556 2.728a.5.5 0 0 1 .526.103z" />
      </svg>

      <motion.div
        className="px-2 py-2 bg-neutral-200 text-black font-bold whitespace-nowrap min-w-max text-xs rounded-full"
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
      >
        {info?.name || info.email}
      </motion.div>
    </motion.div>
  );
};

export default FollowPointer;
