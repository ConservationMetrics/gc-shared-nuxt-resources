<script lang="ts" setup>
import { onMounted } from "vue";

interface Props {
  errorMessage: string;
}

const props = defineProps<Props>();

const loginWithAuth0 = () => {
  window.location.href = "/auth/auth0";
};

// Check for stored redirect URI on component mount
onMounted(() => {
  const redirectUri = sessionStorage.getItem("auth0_redirect_uri");
  if (redirectUri) {
    // Clear the stored URI
    sessionStorage.removeItem("auth0_redirect_uri");
    // Redirect to the original destination
    window.location.href = redirectUri;
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
