import React, { useState } from "react";
import { notificationInterface } from "../../redux/notificationsSlice";
import { BiDotsHorizontal } from "react-icons/bi";
import NotificationActionsDropDown from "./NotificationActionsDropDown";
import { AnimatePresence, motion } from "framer-motion";
import Title from "../widgets/Title";
import FadeElement from "../widgets/FadeElement";

const Notificatin = ({
  _id,
  isRead,
  content,
  createdAt,
}: notificationInterface) => {
  const [showActions, setShowActions] = useState(false);
  return (
    <FadeElement cls="notification relative" key={createdAt}>
      {/* <div className=""

    
    > */}
      <span
        className="dots"
        onClick={() => {
          setShowActions(!showActions);
        }}
      >
        <BiDotsHorizontal className="dots" />
        <AnimatePresence>
          {showActions && (
            <NotificationActionsDropDown _id={_id} bool={isRead} />
          )}
        </AnimatePresence>
      </span>
      <AnimatePresence>
        {!isRead && (
          <FadeElement cls="">
            <Title title="unread" abs>
              <span className="is-read"></span>
            </Title>
          </FadeElement>
        )}
      </AnimatePresence>
      <div className="content">{content}</div>
      <div className="time">
        {new Date(createdAt).toLocaleDateString()} -{" "}
        {new Date(createdAt).toLocaleTimeString()}
      </div>
      {/* </div> */}
    </FadeElement>
  );
};

export default Notificatin;
