import { useAnimate, motion, stagger } from "framer-motion";
import React from "react";
import { ChildrenInterFace } from "../../interfaces/general";

interface Props extends ChildrenInterFace {
  fn: () => void;
  cls: string;
}

const FormAnimation = ({ children, fn, cls }: Props) => {
  const [ref, animateForm] = useAnimate();

  return (
    <span ref={ref}>
      <motion.form
        className={cls}
        onSubmit={fn}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        onAnimationComplete={() => {
          animateForm(
            "form , form > *",
            { opacity: [0, 1], x: [20, 0] },
            { delay: stagger(0.2) }
          );
        }}
      >
        {children}
      </motion.form>
    </span>
  );
};

export default FormAnimation;
