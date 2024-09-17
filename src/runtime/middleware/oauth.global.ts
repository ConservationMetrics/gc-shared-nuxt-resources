import {
  defineNuxtRouteMiddleware,
  useRuntimeConfig,
  navigateTo,
} from "#imports";

// Following example: https://github.com/atinux/atidone/blob/main/app/middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to) => {
  // @ts-ignore to avoid type error on useUserSession, which will be available at runtime in the app
  const { loggedIn } = useUserSession();
  const {
    public: { authStrategy },
  } = useRuntimeConfig();

  if (authStrategy === "auth0" && !loggedIn.value && to.path !== "/login") {
    return navigateTo("/login");
  }
});
