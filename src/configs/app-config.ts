const isProduction = process.env.APP_ENV === "production";

export const appConfig = {
  isProduction,
  activityWatchApiUrl:
    process.env.NEXT_PUBLIC_ACTIVITY_WATCH_API_URL || "http://localhost:5600/api",
};
