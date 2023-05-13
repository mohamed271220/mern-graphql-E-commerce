import React, { useContext, useEffect, useState } from "react";
import DropDown from "../widgets/DropDown";
import { useAppDispatch, useAppSelector } from "../../custom/reduxTypes";
import Notificatin from "./Notificatin";
import { AnimatePresence } from "framer-motion";
import { useMutation } from "@apollo/client";
import {
  Clear_Notification,
  Mark_All_as_Notification,
} from "../../graphql/mutations/user";
import { isAuthContext } from "../../context/isAuth";
import { toast } from "react-hot-toast";
import {
  MarkAllAsReadNotificationRedux,
  clearNotificationRedux,
  notificationInterface,
} from "../../redux/notificationsSlice";
import NoData from "../widgets/NoData";
interface Props {
  bool: boolean;
}

const NotificationDropDown = ({ bool }: Props) => {
  const [showAll, setShowAll] = useState(true);
  const { userId } = useContext(isAuthContext);
  const { notificatins } = useAppSelector((st) => st.notification);
  const [clearFn] = useMutation(Clear_Notification, {
    variables: {
      userId,
    },
  });
  const [MarkAllFn] = useMutation(Mark_All_as_Notification, {
    variables: {
      userId,
    },
  });
  const dispatch = useAppDispatch();
  const [dataShown, setDataShown] = useState<notificationInterface[]>([]);

  useEffect(() => {
    if (notificatins.length === 0) {
      setShowAll(true);
    }
    if (showAll) {
      setDataShown(notificatins);
    } else {
      setDataShown(notificatins.filter((e) => e.isRead === false));
    }
  }, [notificatins, showAll]);

  const handleClear = async () => {
    const { data } = await clearFn();
    if (data?.ClearNotification?.msg) {
      dispatch(clearNotificationRedux());
      toast.success(data?.ClearNotification?.msg);
    }
  };

  const handleMarkAllAsRead = async () => {
    const { data } = await MarkAllFn();
    if (data?.MarkAllAsReadNotification?.status) {
      dispatch(MarkAllAsReadNotificationRedux());
    }
  };
  console.log({ showAll });
  return (
    <DropDown bool={bool} cls="notifications" head="notifications">
      {notificatins.length >= 1 && (
        <div className="notification-btns w-100 center between">
          <div className="filter-btn center">
            <button
              onClick={() => {
                setShowAll(true);
              }}
              style={{ opacity: showAll ? 1 : 0.4 }}
            >
              all
            </button>
            <button
              onClick={() => {
                setShowAll(false);
              }}
              style={{ opacity: !showAll ? 1 : 0.4 }}
            >
              unread
            </button>
          </div>

          <div className="btn-handle-all  center">
            <button
              style={{ fontWeight: "bold" }}
              onClick={handleMarkAllAsRead}
            >
              mark all as read
            </button>
            <button
              onClick={handleClear}
              style={{ fontWeight: "bold", color: "var(--delete)" }}
            >
              clear
            </button>
          </div>
        </div>
      )}
      <NoData
        message={`no ${!showAll ? "unread " : ""}notifications`}
        length={showAll ? notificatins.length : dataShown.length}
      >
        <AnimatePresence>
          {dataShown.map((notificatin, i) => {
            return <Notificatin key={notificatin._id} {...notificatin} />;
          })}
        </AnimatePresence>
      </NoData>
    </DropDown>
  );
};

export default NotificationDropDown;
