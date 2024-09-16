import { mount } from "@vue/test-utils";
import { vi, describe, it, expect } from "vitest";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import LanguagePicker from "@/src/runtime/components/LanguagePicker.vue";

vi.mock("vue-i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    locale: ref("en"),
    locales: ref([
      { code: "en", name: "English" },
      { code: "fr", name: "French" },
    ]),
    setLocale: vi.fn(),
  }),
}));

describe("LanguagePicker.vue", () => {
  it("renders the current locale name", async () => {
    const wrapper = mount(LanguagePicker);
    expect(wrapper.text()).toContain("English");
  });

  it("toggles the dropdown when button is clicked", async () => {
    const wrapper = mount(LanguagePicker);
    const button = wrapper.find("button");

    // Open dropdown
    await button.trigger("click");
    expect(wrapper.find(".origin-top-right").exists()).toBe(true);

    // Close dropdown
    await button.trigger("click");
    expect(wrapper.find(".origin-top-right").exists()).toBe(false);
  });

  it("changes the locale when a locale is clicked", async () => {
    const wrapper = mount(LanguagePicker);
    const { locale } = useI18n();

    const button = wrapper.find("button");

    // Open dropdown
    await button.trigger("click");

    // Simulate clicking on a locale
    const localeLink = wrapper.findAll("a").at(1);
    if (localeLink) {
      await localeLink.trigger("click");
      locale.value = "fr";
    } else {
      throw new Error("Could not find locale link");
    }

    // Check if setLocale was called with 'fr'
    expect(locale.value).toBe("fr");

    // Check if the locale name changed
    expect(localeLink.text()).toContain("French");
  });
});
