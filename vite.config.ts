import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  // If building for web deployment (Vercel / Netlify / GitHub Pages) or mode is app
  const isApp =
    mode === "app" ||
    process.env.BUILD_APP === "true" ||
    process.env.VERCEL === "1";

  if (isApp) {
    return {
      plugins: [react()],
      resolve: {
        alias: {
          "aura-ui-library": resolve(__dirname, "src/index.ts"),
        },
      },
      build: {
        outDir: "dist",
        sourcemap: true,
        emptyOutDir: true,
      },
    };
  }

  // Otherwise, build the npm library distribution
  return {
    plugins: [
      react(),
      dts({
        include: ["src"],
        insertTypesEntry: true,
        rollupTypes: true,
      }),
    ],
    resolve: {
      alias: {
        "aura-ui-library": resolve(__dirname, "src/index.ts"),
      },
    },
    build: {
      outDir: "dist",
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        name: "AuraUI",
        fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
        formats: ["es", "cjs"],
      },
      rollupOptions: {
        external: ["react", "react-dom", "react/jsx-runtime"],
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === "style.css") return "styles.css";
            return assetInfo.name || "";
          },
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
      },
      sourcemap: true,
      emptyOutDir: true,
    },
  };
});
