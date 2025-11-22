import { defineConfig } from "velite";
import { collections } from "./velite-generated"

export default defineConfig({
  root: "content",
  strict: true,
  output: {
    data: "./src/lib/server/data",
    assets: "./static/uploads",
    clean: true
  },
  collections
})