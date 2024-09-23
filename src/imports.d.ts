import * as Imports from "#imports";

declare module "#imports" {
  export * from "#imports";
  export function oauthAuth0EventHandler(config: object): any;
  export function setUserSession(
    event: H3Event,
    session: object,
  ): Promise<void>;
  export function sendRedirect(event: H3Event, location: string): void;
  export function useUserSession(): { loggedIn: { value: boolean } };
  export function useLocalePath(): (path: string) => string;
}
