import { rule } from "graphql-shield";
import { auth } from "../../middlewares/auth";

export const isUser = rule()(async (par: any, args: any, ctx: any) => {
  const accessToken = ctx.req?.headers?.authorization;

  const isAuthenticated = auth(accessToken);
  if (isAuthenticated) {
    return true;
  } else {
    return false;
  }
});
