export const getStripePublicKeyRoute = () =>
  "http://localhost:3000/getkey/stripe";
export const StripeRoute = (userId: string) =>
  `http://localhost:3000/stripe/${userId}`;
