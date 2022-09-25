import { ExternalProvider } from "@ethersproject/providers";

declare global {
  namespace NodeJs {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
    }
  }
  interface Window {
    ethereum?: ExternalProvider;
  }
}

export {};
