import React from "react";
import payImg from "../../assets/Images/pay.png";

const CopyRight = () => {
  return (
    <div className="copyright center">
      <small>Zimart &copy; 2023. All rights reserved.</small>
      <div className="pay-par">
        <img src={payImg} />
        <small style={{ color: "var(--white)", opacity: 0.6 }}>
          Secured Payment Gateways
        </small>
      </div>
    </div>
  );
};

export default CopyRight;
