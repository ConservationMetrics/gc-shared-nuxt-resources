import * as Imports from "#imports";

declare module "#imports" {
  export * from "#imports";
  export function useUserSession(): { loggedIn: { value: boolean } };
  export function useLocalePath(): (path: string) => string;
}
