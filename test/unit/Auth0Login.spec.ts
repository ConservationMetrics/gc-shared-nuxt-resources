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
const mountAuth0Login = (
  props: { errorMessage: string } = { errorMessage: "" },
) => {
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

    Object.defineProperty(window, "location", {
      configurable: true,
      writable: true,
      value: originalLocation,
    });
  });

  it("redirects to stored URI on mount if present", async () => {
    const originalLocation = window.location;

    Object.defineProperty(window, "location", {
      configurable: true,
      writable: true,
      value: { href: "" } as Location,
    });

    // Mock sessionStorage
    const mockSessionStorage = {
      getItem: vi.fn().mockReturnValue("/config"),
      removeItem: vi.fn(),
      setItem: vi.fn(),
      clear: vi.fn(),
    };
    Object.defineProperty(window, "sessionStorage", {
      value: mockSessionStorage,
      writable: true,
    });

    const wrapper = mountAuth0Login();

    // Wait for onMounted to execute
    await wrapper.vm.$nextTick();

    expect(mockSessionStorage.getItem).toHaveBeenCalledWith(
      "auth0_redirect_uri",
    );
    expect(mockSessionStorage.removeItem).toHaveBeenCalledWith(
      "auth0_redirect_uri",
    );
    expect(window.location.href).toBe("/config");

    // Restore original values
    Object.defineProperty(window, "location", {
      configurable: true,
      writable: true,
      value: originalLocation,
    });
  });

  it("does not redirect if no stored URI", async () => {
    const originalLocation = window.location;

    Object.defineProperty(window, "location", {
      configurable: true,
      writable: true,
      value: { href: "" } as Location,
    });

    // Mock sessionStorage
    const mockSessionStorage = {
      getItem: vi.fn().mockReturnValue(null),
      removeItem: vi.fn(),
      setItem: vi.fn(),
      clear: vi.fn(),
    };
    Object.defineProperty(window, "sessionStorage", {
      value: mockSessionStorage,
      writable: true,
    });

    const wrapper = mountAuth0Login();

    // Wait for onMounted to execute
    await wrapper.vm.$nextTick();

    expect(mockSessionStorage.getItem).toHaveBeenCalledWith(
      "auth0_redirect_uri",
    );
    expect(mockSessionStorage.removeItem).not.toHaveBeenCalled();
    expect(window.location.href).toBe(""); // Should not change

    // Restore original values
    Object.defineProperty(window, "location", {
      configurable: true,
      writable: true,
      value: originalLocation,
    });
  });
});
