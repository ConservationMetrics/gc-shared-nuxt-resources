import { ref, onMounted } from "vue";
import { useRouter } from "#imports";

export const useAuth = () => {
  const errorMessage = ref("");
  const redirectPath = ref("");
  // @ts-ignore to avoid type error on useUserSession, which will be available at runtime in the app
  const { loggedIn } = useUserSession();
  const router = useRouter();
  // @ts-ignore to avoid type error on useLocalePath, which will be available at runtime in the app
  const localePath = useLocalePath();

  onMounted(() => {
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
      errorMessage.value = decodeURIComponent(errorDescription || "");
    }

    if (loggedIn.value) {
      router.push(redirectPath.value);
    }
  });

  return {
    errorMessage,
    loggedIn,
    redirectPath,
  };
};
