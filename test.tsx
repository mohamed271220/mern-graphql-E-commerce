//-first i send the ref-token
const getRefToken = () => {
  const refToken = Cookies.get("refresh-token");
  return refToken;
};

const httpLink = new HttpLink({ uri: "http://localhost:3000/graphql" });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `${getRefToken()}` || null,
    },
  }));
  return forward(operation);
});

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  link: concat(authMiddleware, httpLink),

  cache: new InMemoryCache(),
  credentials: "include",
});

//> in backend i sent this to the fn to get the new token

const isUser = rule()(async (par: any, args: any, ctx: any) => {
  console.log(ctx.req.headers.authorization);
  const isAuthenticated = await getNewRefToken(
    ctx.req.headers.authorization,
    ctx.res
  );
  console.log("isAuthenticated =>", isAuthenticated);
  return isAuthenticated;
});

//> how to return back the new cookies
export const getNewRefToken = async (refToken: string, res: Response) => {
  console.log(refToken);
  if (!refToken) {
    return false;
  } else {
    let { result } = (await verfiyRefToken(refToken)) as any;
    console.log("result");
    if (result[0]._id) {
      console.log("condition applied");
      //   const accessTokenExpiration = { expiresIn: "15s" };

      const accessToken = Jwt.sign(
        { result },
        ACCESS_TOKEN_SECRET as unknown as string
      );
      const refreshToken = Jwt.sign(
        { result },
        REFRESH_TOKEN_SECRET as unknown as string
      );
      res.cookie("access-token", accessToken);
      res.cookie("refresh-token", refreshToken);
      res.cookie("refresh", refreshToken as string);
      //   res.json({ accessToken });
      return true;
    } else {
      return false;
    }
  }
};
