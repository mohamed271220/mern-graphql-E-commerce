import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { opacityVariant } from "../../../variants/globals";

import TrUser from "./TrUser";

const DashBoardUsersTable = ({ data }: { data: any }) => {
  return (
    <table className="order box-shadow">
      <thead>
        {" "}
        <th> username</th>
        <th>email</th>
        <th> createdAt </th>
        <th> last in </th>
        <th style={{ width: 150 }}> order state </th>
      </thead>

      <AnimatePresence>
        {data?.map((user: any, i: number) => {
          return (
            <motion.tr
              key={user._id}
              variants={opacityVariant}
              initial="start"
              animate="end"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <TrUser index={i} {...user} />
            </motion.tr>
          );
        })}
      </AnimatePresence>
    </table>
  );
};

export default DashBoardUsersTable;
