/// <reference path="../.astro/types.d.ts" />
/// <reference types="../.astro/@astro/superforms.d.ts" />
declare module "*.webp";
declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    "on:outclick"?: (event: CustomEvent<any>) => void;
  }
}

interface ImportMetaEnv {
  SITE_NAME_TAB: string;

  ALLOWED_ORIGINS: string;

  SMTP_HOST: string;
  SMTP_PORT: string;
  SMTP_LOGIN: string;
  SMTP_PASSWORD: string;
  SMTP_EMAIL_TO: string;
  SMTP_EMAIL_FROM: string;

  YANDEX_MAPS_API_KEY: string;

  WP_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
