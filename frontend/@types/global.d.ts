declare namespace NodeJS {
  interface ProcessEnv {
    readonly JWT_SECRET: string;
    readonly API_URL: string;
  }
}
