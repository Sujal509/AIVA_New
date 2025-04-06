import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "../utilities/cn"; // Or remove cn if not using classnames helper

export default function InfiniteMovingCards({
  items,
  direction = "up", // "down" also works
  speed = "normal",
  pauseOnHover = true,
  className,
}) {
  const containerRef = useRef(null);
  const controls = useAnimation();

  const vertical = true;
  const dirMultiplier = direction === "down" ? 1 : -1;

  const animateCards = () => {
    const containerHeight = containerRef.current?.scrollHeight || 0;
    const distance = containerHeight / 2;

    controls.start({
      y: [0, dirMultiplier * distance],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "loop",
          duration: speed === "slow" ? 30 : speed === "fast" ? 10 : 20,
          ease: "linear",
        },
      },
    });
  };

  useEffect(() => {
    const animation = async () => {
      const containerHeight = containerRef.current?.scrollHeight || 0;
      const distance = containerHeight / 2;

      controls.start({
        y: [0, dirMultiplier * distance],
        transition: {
          y: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed === "slow" ? 30 : speed === "fast" ? 10 : 20,
            ease: "linear",
          },
        },
      });
    };
    animation();
  }, [controls, direction, speed]);

  return (
    <div
      className={cn(
        "relative overflow-hidden h-screen [mask-image:linear-gradient(to_top,transparent,white_20%,white_80%,transparent)] p-4",
        className
      )}
      onMouseEnter={() => pauseOnHover && controls.stop()}
      onMouseLeave={() => pauseOnHover && animateCards()}
    >
      <motion.div
        ref={containerRef}
        animate={controls}
        className="flex flex-col"
      >
        {[...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-700 text-white shadow-md p-4 m-2 rounded-md w-72 mx-auto"
          >
            <p className="text-xs font-semibold text-white">{item.title}</p>
            <p className="text-xs mt-2">{item.message}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
