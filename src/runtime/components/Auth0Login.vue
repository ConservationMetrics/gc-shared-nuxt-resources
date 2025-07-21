<script lang="ts" setup>
import { onMounted } from "vue";

interface Props {
  errorMessage: string;
}

const props = defineProps<Props>();

const loginWithAuth0 = () => {
  window.location.href = "/auth/auth0";
};

// Handle redirect logic on component mount
onMounted(() => {
  console.log(
    "🔍 Auth0Login: Component mounted, checking URL for redirect logic",
  );

  const currentUrl = window.location.href;
  const currentPath = window.location.pathname;

  console.log("🔍 Auth0Login: Current URL:", currentUrl);
  console.log("🔍 Auth0Login: Current path:", currentPath);

  // Skip if we're already on login page
  if (currentPath === "/login") {
    console.log(
      "🔍 Auth0Login: Already on login page, checking for stored redirect",
    );
    const storedRedirect = sessionStorage.getItem("auth0_redirect_uri");
    if (storedRedirect) {
      console.log(
        "🔍 Auth0Login: Found stored redirect, redirecting to:",
        storedRedirect,
      );
      sessionStorage.removeItem("auth0_redirect_uri");
      window.location.href = storedRedirect;
    } else {
      console.log("🔍 Auth0Login: No stored redirect found, staying on login");
    }
    return;
  }

  // Check if we're on a guardianconnector.net domain
  if (currentUrl.includes("guardianconnector.net")) {
    console.log(
      "🔍 Auth0Login: On guardianconnector.net, storing current URL for redirect",
    );
    sessionStorage.setItem("auth0_redirect_uri", currentUrl);
  } else {
    console.log(
      "🔍 Auth0Login: Not on guardianconnector.net, clearing any stored redirect",
    );
    const storedRedirect = sessionStorage.getItem("auth0_redirect_uri");
    if (storedRedirect) {
      console.log(
        "🔍 Auth0Login: Found stored redirect, redirecting to:",
        storedRedirect,
      );
      sessionStorage.removeItem("auth0_redirect_uri");
      window.location.href = storedRedirect;
    }
  }
});
</script>

<template>
  <div class="container relative">
    <div
      class="absolute top-0 right-0 flex justify-end space-x-4 mt-4 mr-4 mb-4"
    >
      <LanguagePicker />
    </div>
    <div class="flex flex-col items-center justify-center h-screen">
      <p class="italic">{{ $t("authMessage") }}.</p>
      <button
        class="px-4 py-2 mt-4 mb-4 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        @click="loginWithAuth0"
      >
        {{ $t("loginButton") }}
      </button>
      <p v-if="props.errorMessage" class="text-red-500 text-xs italic">
        {{ $t("yourAccessIsPending") }}
      </p>
    </div>
  </div>
</template>
