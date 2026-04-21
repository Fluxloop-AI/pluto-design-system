import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    lucide: "src/lucide.ts",
    "custom/index": "src/custom/index.ts",
  },
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  target: "es2022",
  treeshake: true,
  splitting: false,
  external: ["react", "react-dom", "lucide-react"],
});
