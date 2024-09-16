import { defineNuxtModule, addComponent, createResolver } from "@nuxt/kit";

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "gc-shared-components",
    configKey: "gcSharedComponents",
  },

  async setup(_options, _nuxt) {
    const { resolve } = createResolver(import.meta.url);

    addComponent({
      name: "LanguagePicker",
      filePath: resolve("./runtime/components/LanguagePicker.vue"),
    });
  },
});
