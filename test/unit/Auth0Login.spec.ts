import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createI18n } from "vue-i18n";

import Auth0Login from "@/runtime/components/Auth0Login.vue";

vi.mock("gc-shared-components", () => ({
  LanguagePicker: {
    template: "<div></div>",
  },
}));

// Create the i18n instance
const i18n = createI18n({
  legacy: false, // Use Composition API mode
  locale: "en",
  messages: {
    en: {
      loginButton: "Login",
      authMessage: "Please log in",
      yourAccessIsPending: "Access pending",
    },
  },
});

// Helper function to mount the Auth0Login component
const mountAuth0Login = (props = {}) => {
  return mount(Auth0Login, {
    global: {
      plugins: [i18n],
      components: {
        LanguagePicker: {
          template: "<div></div>",
        },
      },
    },
    props,
  });
};

describe("Auth0Login", () => {
  it("renders login button", () => {
    const wrapper = mountAuth0Login();
    expect(wrapper.find("button").text()).toBe("Login");
  });

  it("displays error message when provided", () => {
    const wrapper = mountAuth0Login({ errorMessage: "Access pending" });
    expect(wrapper.find(".text-red-500").text()).toBe("Access pending");
  });

  it("changes window.location.href to /auth/auth0 on button click", async () => {
    const wrapper = mountAuth0Login();

    const originalLocation = window.location;

    Object.defineProperty(window, "location", {
      configurable: true,
      writable: true,
      value: { href: "" } as Location,
    });

    await wrapper.find("button").trigger("click");

    expect(window.location.href).toBe("/auth/auth0");

    window.location = originalLocation;
  });
});
