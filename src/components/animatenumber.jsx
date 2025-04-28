import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";

export function AnimatedNumber({ target }) {
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(motionValue, target, {
      duration: 2, // how long the animation runs
      onUpdate: (latest) => {
        setDisplayValue(latest.toFixed(0)); // no decimals
      }
    });

    return controls.stop; // clean up animation if component unmounts
  }, [target]);

  return (
    <motion.span>
      ${displayValue}
    </motion.span>
  );
}
