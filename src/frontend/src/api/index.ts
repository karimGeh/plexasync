import axios from "axios";
// import { store } from "store";

import { getAPIBaseURL } from "./getHost";

const baseURL = getAPIBaseURL();

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  // add auth token to all requests if user is logged in
  // if (store.getState().user.token) {
  //   config.headers["Authorization"] = `Bearer ${store.getState().user.token}`;
  // }
  // x-auth
  config.headers[
    "x-auth"
  ] = `baa1bfcf086fea845057286f4a47d61fc8439df2e9bc3bd5a857e62c93e538037e96a657977bf4c2b9cc0d2a716b0ae8f0cd108ecc19337b5bbdec9d11fb3acb`;
  return config;
});

export default api;
