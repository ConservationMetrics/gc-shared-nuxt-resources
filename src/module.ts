import { defineNuxtModule, addComponent, createResolver } from "@nuxt/kit";

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "gc-shared-resources",
    configKey: "gcSharedResources",
  },

  async setup(_options, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    addComponent({
      name: "LanguagePicker",
      filePath: resolve("./runtime/components/LanguagePicker.vue"),
    });

    // TODO: How to add a CSS file without making it globally available to the entire app?
    nuxt.options.css.push(resolve("./runtime/assets/overlay.css"));
  },
});
