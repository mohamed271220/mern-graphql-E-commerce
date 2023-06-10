import React, { useEffect } from "react";
import Map from "./Map";
import ContactForm from "./ContactForm";
const ContactUs = () => {
  useEffect(() => {
    document.title = "Contact Us";
  }, []);
  return (
    <div id="contact">
      <div className="contact">
        <Map />
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactUs;
