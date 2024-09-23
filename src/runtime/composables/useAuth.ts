import { ref } from "vue";
import { useRouter, useLocalePath } from "#imports";

export const useAuth = (loggedIn: { value: boolean }) => {
  let errorMessage;
  const redirectPath = ref("");

  const router = useRouter();
  // @ts-ignore to avoid type error on useLocalePath, which will be available at runtime in the app
  const localePath = useLocalePath();

  const redirect = router.currentRoute.value.query.redirect;
  redirectPath.value = redirect
    ? decodeURIComponent(redirect as string)
    : localePath("/");

  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  if (code) {
    window.location.href = `/auth/auth0?code=${code}`;
  }

  const error = urlParams.get("error");
  const errorDescription = urlParams.get("error_description");

  if (error === "access_denied") {
    errorMessage = decodeURIComponent(errorDescription || "");
  }

  if (loggedIn.value) {
    router.push(redirectPath.value);
  }

  return errorMessage;
};
