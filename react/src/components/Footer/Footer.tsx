import React, { useEffect } from "react";
import AboutFooter from "./AboutFooter";
import FooterCategory from "./FooterCategory";
import FooterSocial from "./FooterSocial";
import CopyRight from "./CopyRight";
import FooterLinks from "./FooterLinks";
import { stagger, useAnimate, useInView } from "framer-motion";
const Footer = () => {
  const [scope, animate] = useAnimate();
  const inView = useInView(scope, { once: true });
  useEffect(() => {
    if (inView) {
      animate(
        "footer > * ,p,footer  div",
        { opacity: [0, 0.4, 0.8, 1] },
        { duration: 0.2, delay: stagger(0.1) }
      );
    }
  }, [inView]);
  return (
    <footer ref={scope}>
      <div className="content">
        <AboutFooter />
        <FooterCategory />
        <FooterLinks />
        <FooterSocial />
      </div>
      <CopyRight />
    </footer>
  );
};

export default Footer;
