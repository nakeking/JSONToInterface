import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/jsonToInterface", component: "JSONToTsInterface" },
  ],
  npmClient: 'pnpm',
  plugins: [
    "@umijs/plugins/dist/antd"
  ],
  antd: {},
  proxy: {
    "/api": {
      target: "http://localhost:9527/",
      changeOrigin: true,
      pathRewrite: {"^/api": ""}
    }
  }
});
