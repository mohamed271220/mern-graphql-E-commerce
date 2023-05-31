import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { opacityVariant } from "../../variants/globals";
import Title from "./Title";
import { AiTwotoneEye } from "react-icons/ai";
import { MdOutlineClear } from "react-icons/md";
import FadeElement from "./FadeElement";
interface Props {
  placeholder: string;
  err?: string;
  defaultVal?: string;
  type?: string;
  inptype?: string;
}
const Input = ({
  inptype = "input",
  placeholder,
  err,
  type = "text",
  defaultVal,
}: Props) => {
  const [typeSt, settypeSt] = useState(type);
  const handlePass = () =>
    typeSt === "password" ? settypeSt("text") : settypeSt("password");

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
      {inptype === "input" ? (
        <input
          className="inp"
          type={typeSt}
          onFocus={() => setIsFocus(true)}
          {...register(placeholder, {
            onBlur() {
              setIsFocus(false);
            },
          })}
          defaultValue={defaultVal}
          step={type === "number" ? ".01" : "any"}
        />
      ) : (
        <textarea
          className="inp"
          onFocus={() => setIsFocus(true)}
          {...register(placeholder, {
            onBlur() {
              setIsFocus(false);
            },
          })}
        />
      )}
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
      <>
        {inptype === "input" && (
          <>
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
            <div className="inp-controls">
              <AnimatePresence>
                {inpVal && type !== "password" && (
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
                      <MdOutlineClear />
                    </motion.span>
                  </Title>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {type === "password" && inpVal && (
                  <FadeElement key={"show-eye"} cls="">
                    <Title
                      title={
                        typeSt === "password"
                          ? "show password"
                          : "hide password"
                      }
                    >
                      <motion.span className="pass-inp" onClick={handlePass}>
                        <AiTwotoneEye />
                      </motion.span>
                    </Title>
                  </FadeElement>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default Input;
