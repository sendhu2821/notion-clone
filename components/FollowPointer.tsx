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
      {/* <svg
        stroke={color}
        fill={color}
        strokeWidth="1"
        viewBox="0 0 16 16"
        className="h-6 w-6 transform -rotate-[70deg] -translate-x-[12px] -translate-y-[10px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916L13.556 2.728a.5.5 0 0 1 .526.103z" />
      </svg> */}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="20"
        height="20"
        viewBox="0 0 48 48"
      >
        <path
          fill={color}
          d="M42.313,25.794L12.8,2.219c-0.308-0.245-0.731-0.286-1.082-0.107	c-0.351,0.181-0.562,0.551-0.54,0.944l2.096,37.717l9.291-8.727l5.251,10.177c0.367,0.712,0.989,1.239,1.752,1.482	c0.302,0.097,0.61,0.145,0.918,0.145c0.471,0,4.104-0.743,4.104-0.743c0.713-0.366,1.239-0.989,1.483-1.753	c0.244-0.763,0.176-1.576-0.191-2.288l-5.249-10.181l0.628-0.074L42.313,25.794z"
        ></path>
        <path
          fill="none"
          stroke="#324561"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width="2"
          d="M34.131,42.218l-2.734,1.408c-0.982,0.506-2.187,0.12-2.693-0.861l-5.912-11.46l-8.521,9.412"
        ></path>
        <line
          x1="41.69"
          x2="31.127"
          y1="26.575"
          y2="27.82"
          fill="none"
          stroke="#324561"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width="2"
        ></line>
      </svg>

      <motion.div
        className="px-2 py-1 bg-neutral-100 text-black font-bold whitespace-nowrap min-w-max text-xs rounded-full"
        style={{ backgroundColor: color }}
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
