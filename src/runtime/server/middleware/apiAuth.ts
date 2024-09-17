import { defineEventHandler, H3Event } from "h3";
import apiRequestValidator from "../../../utils/apiRequestValidator";

// @ts-ignore to avoid type error on useRuntimeConfig, which will be available at runtime in the app
// prettier-ignore
const { public: { appApiKey }} = useRuntimeConfig();

export default defineEventHandler((event: H3Event) => {
  apiRequestValidator(appApiKey)(event);
});
