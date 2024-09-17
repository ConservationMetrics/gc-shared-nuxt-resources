import { defineEventHandler, H3Event, createError, eventHandler } from "h3";

// @ts-ignore to avoid type error on useRuntimeConfig, which will be available at runtime in the app
// prettier-ignore
const { public: { appApiKey }} = useRuntimeConfig();

export default defineEventHandler(
  eventHandler((event: H3Event) => {
    const url = event.node.req.url;
    if (!url) {
      return;
    }

    // Only apply middleware to API routes
    if (!url.startsWith("/api/")) {
      return;
    }

    // Bypass middleware for specific paths
    if (url.startsWith("/api/map") || url.startsWith("/api/_auth/")) {
      return;
    }

    // Match the API key from the request with the app's API key
    const requestApiKey = event.node.req.headers["x-api-key"];

    if (requestApiKey !== appApiKey) {
      throw createError({
        status: 403,
        message: "Forbidden",
      });
    }
  }),
);
