import React from "react";
import LogoSvg from "../widgets/LogoSvg";

const AboutFooter = () => {
  return (
    <div className="about-footer center col ">
      <LogoSvg />
      <p>
        I created this e-commerce using SCSS, React, TypeScript, Apollo Client,
        React Router DOM, Framer Motion for Frontend <br />
        TypeScript, Mongoose, Node.js, Express, GraphQL, Stripe, OAuth Google,
        Authorization (Backend).
      </p>
    </div>
  );
};

export default AboutFooter;
