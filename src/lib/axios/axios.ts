import axios from "axios";

import { appConfig } from "@/configs";
// import { COOKIES } from "@/constants/cookies";

// import { getCookie } from "../cookies";

export const axiosInstance = axios.create({
  baseURL: appConfig.activityWatchApiUrl,
  timeout: 20000,
});

// axiosInstance.interceptors.request.use((req) => {
//   const token = getCookie(COOKIES.TOKEN);

//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }

//   return req;
// });

export * from "axios";
export { axiosInstance as axios };
