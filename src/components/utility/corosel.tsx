import { useMemo, useState } from "react";
import Image from "next/image";

import {
  AnimatePresence,
  AnimationProps,
  motion,
  wrap,
  useReducedMotion,
} from "framer-motion";
import { BiSolidLeftArrow } from "react-icons/bi";

import { classNames } from "@/utility/classNames";

const variant: AnimationProps["variants"] = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

export type CoroselProps = {
  aspectRatio: number;
  images: string[];
};

export default function Corosel({ aspectRatio = 1, images }: CoroselProps) {
  const [[page, direction], setPage] = useState([0, 0]);
  const prefersReducedMotion = useReducedMotion();

  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => setPage([page + newDirection, newDirection]);

  const dots = useMemo(
    () =>
      images.map((_, index) => (
        <span
          key={index}
          className={classNames(
            "h-2 w-2 rounded-full",
            index === imageIndex ? "bg-accent" : "bg-zinc-700 dark:bg-zinc-400"
          )}
        />
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [images, imageIndex]
  );

  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio }}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          className="relative h-full w-full"
          style={{ aspectRatio }}
          custom={direction}
          variants={variant}
          initial="enter"
          animate="center"
          exit="exit"
          transition={
            prefersReducedMotion
              ? { opacity: { duration: 0.2 } }
              : { x: { type: "spring", stiffness: 220, damping: 28 }, opacity: { duration: 0.2 } }
          }
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            if (prefersReducedMotion) return;
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) paginate(1);
            else if (swipe > swipeConfidenceThreshold) paginate(-1);
          }}
        >
          <Image
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
            loading="lazy"
            priority={false}
            alt={`Project image ${imageIndex + 1}`}
            className="object-cover"
            src={images[imageIndex]}
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-0 flex h-12 w-full items-center justify-center gap-2">
        <button onClick={() => paginate(1)} className="hidden h-4 w-4 lg:inline-block">
          <BiSolidLeftArrow className="fill-zinc-700 dark:fill-zinc-400" />
        </button>
        {dots}
        <button onClick={() => paginate(-1)} className="hidden h-4 w-4 lg:inline-block">
          <BiSolidLeftArrow className="rotate-180 fill-zinc-700 dark:fill-zinc-400" />
        </button>
      </div>
    </div>
  );
}
