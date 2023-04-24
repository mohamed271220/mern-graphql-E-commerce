import React, { useState, useContext, useRef } from "react";
import SlideButton from "../widgets/SlideButton";
import AddRate from "./AddRate";
import useAddReview from "../../custom/useAddReview";
import { isAuthContext } from "../../context/isAuth";
import { productContext } from "./Product";

interface Props {
  setShowAddRate: React.Dispatch<React.SetStateAction<boolean>>;
  _id: string;
  rateIndex: number;
  setRateIndex: React.Dispatch<React.SetStateAction<number>>;
}

const AddReview = ({ setShowAddRate, _id, rateIndex, setRateIndex }: Props) => {
  const { userId } = useContext(isAuthContext);
  const { setAddReviews } = useContext(productContext);
  const [inpVal, setInpVal] = useState("");
  const obj = {
    userId,
    image: "",
    _id,
    rate: rateIndex + 1,
    review: inpVal,
    user: "",
  };
  const [addReviewFn] = useAddReview(obj);
  const handleCHange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInpVal(e.target.value);
  };
  return (
    <SlideButton
      doneMsg="rate added"
      head="add rate"
      sethide={setShowAddRate}
      cls="add-rate-pop"
      height={200}
      fn={async () => {
        const { data } = await addReviewFn();
        console.log({ data });
        setAddReviews((cur) => [...cur, data.addReview]);
      }}
    >
      <AddRate setRateIndex={setRateIndex} rateIndex={rateIndex} />
      <form className="rate-form">
        <input type="text" className="inp rate-inp" onChange={handleCHange} />
      </form>
    </SlideButton>
  );
};

export default AddReview;
