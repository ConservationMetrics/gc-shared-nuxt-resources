import {
  defineNuxtModule,
  addComponentsDir,
  addImportsDir,
  addRouteMiddleware,
  addServerHandler,
  createResolver,
} from "@nuxt/kit";

export interface ModuleOptions {
  enableOAuth?: boolean;
  customCssPath?: string;
  apiAuthEnabled?: boolean;
  auth0RoutePath?: string;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "gc-shared-resources",
    configKey: "gcSharedResources",
  },

  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    // Add composables directory
    addImportsDir(resolve("./runtime/composables"));

    // Add components directory
    addComponentsDir({
      path: resolve("./runtime/components"),
    });

    // Add CSS files
    const cssPath =
      options.customCssPath || resolve("./runtime/assets/overlay.css");
    nuxt.options.css.push(cssPath);

    // Conditionally add global middleware
    if (options.enableOAuth !== false) {
      // Default to true if not specified
      addRouteMiddleware({
        name: "oauth.global",
        path: resolve("./runtime/middleware/oauth.global"),
        global: true,
      });
    }

    // Conditionally add server middleware for API authentication
    if (options.apiAuthEnabled !== false) {
      // Default to true if not specified
      addServerHandler({
        middleware: true,
        handler: resolve("./runtime/server/middleware/apiAuth"),
      });
    }

    // Add server route for Auth0 with customizable path
    const auth0Path = options.auth0RoutePath || "/auth/auth0";
    addServerHandler({
      route: auth0Path,
      handler: resolve("./runtime/server/routes/auth/auth0.get"),
    });
  },
});
