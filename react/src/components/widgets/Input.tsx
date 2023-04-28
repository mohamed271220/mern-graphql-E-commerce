import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { opacityVariant } from "../../variants/globals";
import Title from "./Title";
interface Props {
  placeholder: string;
  err?: string;
  defaultVal?: string;
  type?: string;
}
const Input = ({ placeholder, err, type, defaultVal }: Props) => {
  const { watch, register, resetField, setValue } = useFormContext();
  const inpVal = watch(placeholder);

  const [isFocus, setIsFocus] = useState(false);
  const placeholderVariant = {
    start: { top: inpVal || isFocus ? "50%" : "0" },
    end: { top: inpVal || isFocus ? "0" : "50%" },
  };

  useEffect(() => {
    if (defaultVal !== "") {
      setValue(placeholder, defaultVal);
    }
  }, [defaultVal]);
  return (
    <div className="inp-parent">
      <input
        className="inp"
        type={type || "text"}
        onFocus={() => setIsFocus(true)}
        {...register(placeholder, {
          onBlur() {
            setIsFocus(false);
          },
        })}
        defaultValue={defaultVal}
      />
      <AnimatePresence>
        {err && (
          <motion.span
            className="err-form"
            variants={opacityVariant}
            transition={{ duration: 0.4 }}
            initial="start"
            animate="end"
            exit="exit"
          >
            {err}
          </motion.span>
        )}
      </AnimatePresence>

      <motion.span
        variants={placeholderVariant}
        initial="start"
        animate="end"
        className={`placeholder ${
          inpVal || isFocus ? "placeholder-top" : "placeholder-center"
        }`}
      >
        {placeholder === "new" ||
        placeholder === "old" ||
        placeholder === "confirm"
          ? `${placeholder} password`
          : placeholder}
      </motion.span>
      <AnimatePresence>
        {inpVal && (
          <Title title={`clear ${placeholder} field`} abs={true}>
            <motion.span
              className="x-inp"
              onClick={() => resetField(placeholder)}
              variants={opacityVariant}
              initial="start"
              animate="end"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              x
            </motion.span>
          </Title>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Input;
