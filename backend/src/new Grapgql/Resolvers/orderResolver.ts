import { OrderCollection } from "../../mongoose/schema/order";
import { IdInterface } from "../interfaces/graqphInterfaces.js";

interface updateOrderInrterface {
  _id: string;
  state: string;
  deliveredAt: string;
}
interface delInterfaceOrder {
  _id: IdInterface[];
}

export const orderResolver = {
  Query: {
    async order(_: any, args: IdInterface) {
      console.log("order");
      return await OrderCollection.findById(args.id);
    },
    async orders() {
      console.log("orders");

      return await OrderCollection.find({});
    },
  },
  Mutation: {
    async updateOrder(_: any, args: any) {
      console.log(args);
      const res = await OrderCollection.findByIdAndUpdate(args.input._id, {
        state: args.input.state,
        deliveredAt: args.input.deliveredAt,
      });
      return { msg: `order is  ${args.input.state} successfully` };
    },
    async deleteOrder(_: any, args: delInterfaceOrder) {
      const length = args._id.length;
      await OrderCollection.deleteMany({ _id: { $in: args._id } });

      return {
        msg: `${length} ${length >= 2 ? "orders" : "order"} ${
          length >= 2 ? "are" : "is"
        } successfully deleted`,
      };
    },
  },
};
