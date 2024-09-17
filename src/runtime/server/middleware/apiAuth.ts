import { defineEventHandler, H3Event } from "h3";
import apiRequestValidator from "../../../utils/apiRequestValidator";

// prettier-ignore to avoid breaking formatting for @ts-ignore
// @ts-ignore to avoid type error on useRuntimeConfig, which will be available at runtime in the app
const {
  public: { appApiKey },
} = useRuntimeConfig();

export default defineEventHandler((event: H3Event) => {
  apiRequestValidator(appApiKey)(event);
});
