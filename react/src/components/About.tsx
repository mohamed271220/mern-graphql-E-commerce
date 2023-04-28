import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Transition from "./widgets/Transition";
const About = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });
  const mainP = useTransform(scrollYProgress, [0.15, 0.4], [150, 0]);
  const leftP = useTransform(scrollYProgress, [0.45, 0.65], [150, 0]);
  const rightP = useTransform(scrollYProgress, [0.8, 0.95], [-150, 0]);

  return (
    <motion.div className="about-par center col" ref={sectionRef}>
      <Transition />
      <h1 className="underline header">About Us</h1>

      <motion.p className="middle" style={{ y: mainP }}>
        Welcome to Zimart, your one-stop shop for all your online shopping
        needs. Our platform offers a wide variety of products, from fashion and
        beauty to electronics and home goods, at affordable prices.At Zimart, we
        are committed to offering high-quality products from trusted brands, so
        you can shop with confidence knowing that you&apos;re getting the best
        value for your money.Our team is dedicated to providing exceptional
        customer service, ensuring that you have a positive shopping experience
        with us every time.
      </motion.p>

      <motion.p className="left" style={{ x: leftP }}>
        At Zimart, we believe that shopping online should be easy, fun, and
        convenient. That&apos;s why we&apos;ve created a user-friendly platform
        that allows you to browse and purchase products with just a few clicks.
        Our dedicated team of experts works tirelessly to ensure that we offer
        the latest and greatest products at competitive prices. But we&apos;re
        more than just an e-commerce app. We&apos;re a community of online
        shoppers who value quality, affordability, and convenience. We&apos;re
        committed to providing our customers with a seamless shopping experience
        and top-notch customer service.
      </motion.p>

      <motion.p className="right" style={{ x: rightP }}>
        Our story began with a vision to make online shopping accessible to
        everyone, regardless of location or budget. We started small, offering a
        few select products and building our brand from the ground up. Today,
        Zimart has grown into a trusted online marketplace with a wide range of
        products and a loyal customer base. Whether you&apos;re shopping for a
        new outfit, the latest tech gadget, or something for your home, Zimart
        has you covered. We invite you to join our community, discover our
        collection, and experience the convenience of shopping online with
        Zimart.
      </motion.p>
    </motion.div>
  );
};

export default About;
