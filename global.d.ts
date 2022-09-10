declare global {
  namespace NodeJs {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
    }
  }
}

export {};
