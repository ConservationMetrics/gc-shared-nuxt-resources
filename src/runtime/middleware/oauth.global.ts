import {
  defineNuxtRouteMiddleware,
  useRuntimeConfig,
  useUserSession,
  navigateTo,
} from "#imports";

// Following example: https://github.com/atinux/atidone/blob/main/app/middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to) => {
  const { loggedIn } = useUserSession();
  const {
    public: { authStrategy },
  } = useRuntimeConfig();

  if (authStrategy === "auth0" && !loggedIn.value && to.path !== "/login") {
    // Only store redirect URI on client side
    if (import.meta.client) {
      const redirectUri = window.location.href;
      sessionStorage.setItem("auth0_redirect_uri", redirectUri);
    }
    // Redirect to login
    return navigateTo("/login");
  }
});
