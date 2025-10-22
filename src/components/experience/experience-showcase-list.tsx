import { useRef } from "react";

import { motion, useScroll } from "framer-motion";

import ExperienceShowcaseListItem, {
  type ExperienceShowcaseListItemProps,
} from "@/components/experience/experience-showcase-list-item";
import { FlipWords } from "@/animation/flip-words";

export interface ExperienceShowcaseListProps {
  title: string;
  details: ExperienceShowcaseListItemProps[];
}

export default function ExperienceShowcaseList(
  props: ExperienceShowcaseListProps
) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  const words = ["adventure", "chapter", "journey"];

  return (
    <div
      id="experience"
      className="mx-auto my-40 max-w-7xl px-6 sm:px-14 md:my-60 md:px-20"
    >
      <h2 className="md:mb-30 mb-16 w-full bg-gradient-to-r from-accent/70 to-accent bg-clip-text text-center text-3xl font-bold text-transparent xs:text-4xl sm:text-6xl md:text-8xl">
        {props.title}
      </h2>
      <div ref={ref} className="relative w-full md:mx-auto md:w-[80%]">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute bottom-10 left-9 top-5 w-[5px] origin-top rounded-lg bg-accent sm:bottom-12"
        ></motion.div>
        <ul className="ml-4 w-full items-center">
          {props.details.map((_details, index) => (
            <ExperienceShowcaseListItem key={index} {..._details} />
          ))}
        </ul>
        <h3 className="mx-auto mt-8 w-[60%] text-center text-base font-bold text-foreground sm:text-xl md:text-2xl">
          And a new <FlipWords words={words} /> ahead
        </h3>
      </div>
    </div>
  );
}
