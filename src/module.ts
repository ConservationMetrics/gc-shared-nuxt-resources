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

    addImportsDir(resolve("./runtime/composables"));

    addComponentsDir({
      path: resolve("./runtime/components"),
    });

    const cssPath =
      options.customCssPath || resolve("./runtime/assets/overlay.css");
    nuxt.options.css.push(cssPath);

    if (options.enableOAuth !== false) {
      addRouteMiddleware({
        name: "oauth.global",
        path: resolve("./runtime/middleware/oauth.global"),
        global: true,
      });
    }

    if (options.apiAuthEnabled !== false) {
      addServerHandler({
        middleware: true,
        handler: resolve("./runtime/server/middleware/apiAuth"),
      });
    }

    const auth0Path = options.auth0RoutePath || "/auth/auth0";
    addServerHandler({
      route: auth0Path,
      handler: resolve("./runtime/server/routes/auth/auth0.get"),
    });
  },
});
