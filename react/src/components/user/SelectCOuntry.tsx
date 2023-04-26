import React, { useEffect, useRef, useState } from "react";
import { BiDownArrow } from "react-icons/bi";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { opacityVariant, selectDropDownVariants } from "../../variants/globals";
interface Props {
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  country: string;
}
const SelectCOuntry = ({ setCountry, country }: Props) => {
  const [countries, setCountries] = useState([]);
  const [flag, setFlag] = useState("https://flagcdn.com/w320/eg.png");
  const [showDropSelect, setShowSelectDrop] = useState(false);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      //   .then((data) => data.json())
      .then((data) => data.json())
      .then((data) => setCountries(data));
  }, []);

  const toggleShowSelectDrop = () => {
    setShowSelectDrop(!showDropSelect);
  };

  const parent = {
    start: {},
    end: { transition: { staggerChildren: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.4 } },
  };

  const selectedFlag = {
    start: { opacity: 0 },
    end: { opacity: 1, rotate: [0, 20, -20, 0], transition: { duration: 0.4 } },
  };

  const listVariant = {
    start: { opacity: 0, x: -100 },
    end: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };
  const ref = useRef<HTMLDivElement | null>(null);
  const view = useInView(ref);
  return (
    <div
      className="select-country-par relative center start "
      onClick={toggleShowSelectDrop}
    >
      <AnimatePresence mode="wait">
        <motion.div
          style={{ overflow: "hidden" }}
          key={flag}
          className="select-country center gap"
          variants={parent}
          initial="start"
          animate="end"
          exit="exit"
        >
          <motion.img src={flag} alt={"flag"} variants={selectedFlag} />

          <motion.span variants={opacityVariant}> {country}</motion.span>
        </motion.div>
      </AnimatePresence>
      <BiDownArrow className="icon select-icon arrow" />
      <AnimatePresence>
        {showDropSelect && (
          <motion.div className="select-dropdown gap drop-country">
            {countries.map((obj: any, i) => {
              const flag = obj.flags.png;
              const country = obj.name.common;
              return (
                <motion.div
                  variants={listVariant}
                  custom={view}
                  ref={ref}
                  initial="start"
                  animate="end"
                  exit="exit"
                  key={i}
                  className="select-country center gap"
                  whileHover={{ x: 4 }}
                  onClick={() => {
                    setFlag(flag);
                    setCountry(country);
                  }}
                >
                  <img src={flag} alt={"flag"} />

                  <span> {country}</span>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SelectCOuntry;
