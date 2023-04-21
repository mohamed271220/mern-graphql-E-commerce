import React from "react";
import { useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
interface Props {
  placeholder: string;
  err?: string;
}
const Input = ({ placeholder, err }: Props) => {
  const { watch, register, resetField } = useFormContext();
  const inpVal = watch(placeholder);

  return (
    <div className="inp-parent">
      <input
        placeholder={placeholder}
        className="inp"
        type="text"
        {...register(placeholder)}
      />

      <AnimatePresence>
        {inpVal && (
          <>
            <motion.span className="placeholder">{placeholder}</motion.span>
            <motion.span
              className="x-inp"
              onClick={() => resetField(placeholder)}
            >
              x
            </motion.span>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Input;
