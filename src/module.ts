import {
  defineNuxtModule,
  addComponentsDir,
  addImportsDir,
  addRouteMiddleware,
  addServerHandler,
  createResolver,
} from "@nuxt/kit";

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "gc-shared-resources",
    configKey: "gcSharedResources",
  },

  async setup(_options, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    // Add composables directory
    addImportsDir(resolve("./composables"));

    // Add components directory
    addComponentsDir({
      path: resolve("./runtime/components"),
    });

    // Add CSS files
    // TODO: How to add a CSS file without making it globally available to the entire app?
    nuxt.options.css.push(resolve("./runtime/assets/overlay.css"));

    // Add global middleware
    addRouteMiddleware({
      name: "oauth.global",
      path: resolve("./runtime/middleware/oauth.global"),
      global: true,
    });

    // Add server middleware for API authentication
    addServerHandler({
      middleware: true,
      handler: resolve("./runtime/server/middleware/apiAuth"),
    });
  },
});
