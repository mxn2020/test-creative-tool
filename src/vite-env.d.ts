/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MONGODB_URI: string
  readonly VITE_API_URL: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_DESCRIPTION: string
  readonly NETLIFY_FUNCTIONS_URL: string
  readonly VITE_GEENIUS_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}