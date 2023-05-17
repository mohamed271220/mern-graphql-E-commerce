import React, { useState, useContext, useRef, useEffect } from "react";
import SlideButton from "../widgets/SlideButton";
import AddRate from "./AddRate";
import useAddReview from "../../custom/useAddReview";
import { isAuthContext } from "../../context/isAuth";
import { useAppDispatch } from "../../custom/reduxTypes";
import { addReviewRedux, updateReviewRedux } from "../../redux/productSlice";
import { useMutation } from "@apollo/client";
import { update_Review } from "../../graphql/mutations/user";

interface Props {
  setShowAddRate: React.Dispatch<React.SetStateAction<boolean>>;
  _id: string;
  rateIndex: number;
  setRateIndex: React.Dispatch<React.SetStateAction<number>>;
  defaultVal: string;
  hasReview: boolean;
}

const AddReview = ({
  setShowAddRate,
  _id,
  rateIndex,
  setRateIndex,
  hasReview,
  defaultVal,
}: Props) => {
  const dispatch = useAppDispatch();
  const {
    userId,
    name,
    userData: { image },
  } = useContext(isAuthContext);
  const [inpVal, setInpVal] = useState("");
  const obj = {
    userId,
    image: image,
    _id,
    rate: rateIndex + 1,
    review: inpVal,
    user: name,
  };

  const [addReviewFn] = useAddReview(obj);
  const handleCHange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInpVal(e.target.value);
  };

  const updateReviewObj = {
    userId,
    productId: _id,
    review: inpVal || defaultVal,
    rate: rateIndex + 1,
  };

  const [updateReviewFn] = useMutation(update_Review, {
    variables: {
      input: updateReviewObj,
    },
  });
  const [IsStatus200, setIsStatus200] = useState(false);
  useEffect(() => {
    if (!IsStatus200) return;
    const timer = setTimeout(() => {
      setIsStatus200(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [IsStatus200]);

  const handleAddReview = async () => {
    const { data } = await addReviewFn();
    console.log({ addReview: data });
    if (data?.addReview?._id) {
      setIsStatus200(true);
      dispatch(
        addReviewRedux({
          reviewObj: { ...obj, _id: data?.addReview?._id },
          _id,
        })
      );
    }
  };

  const updateReview = async () => {
    await updateReviewFn();
    setIsStatus200(true);
    dispatch(updateReviewRedux(updateReviewObj));
  };

  return (
    <SlideButton
      doneMsg={hasReview ? "rate updated" : "rate added"}
      head="add rate"
      sethide={setShowAddRate}
      cls="add-rate-pop"
      height={200}
      IsStatus200={IsStatus200}
      isVaild
      fn={hasReview ? updateReview : handleAddReview}
    >
      <AddRate setRateIndex={setRateIndex} rateIndex={rateIndex} />
      <form className="rate-form">
        <input
          placeholder="add review"
          style={{ paddingLeft: 8 }}
          type="text"
          className="inp rate-inp"
          onChange={handleCHange}
          defaultValue={defaultVal}
        />
      </form>
    </SlideButton>
  );
};

export default AddReview;
