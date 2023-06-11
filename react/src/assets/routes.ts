// const backendRoute = "http://localhost:3000/";
const backendRoute = "/";

export const newRefToken = `${backendRoute}token/auth/newRefToken`;
export const graphQLRoute = `${backendRoute}graphql`;
export const getStripePublicKeyRoute = () => `${backendRoute}getkey/stripe`;
export const StripeRoute = (userId: string) =>
  `${backendRoute}stripe/${userId}`;

export const uploadImagesRoute = (id: string) =>
  `${backendRoute}products/images/upload/${id}`;

export const updateUserImg = (id: string) => `${backendRoute}upload/${id}`;
export const signUpWithGoogle = `${backendRoute}auth/signup/google`;
export const logInWithGoogle = `${backendRoute}auth/login/google`;
