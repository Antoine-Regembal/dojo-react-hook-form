import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    include: [
      "**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
      "**/*.steps.{js,ts,tsx,jsx}",
    ],
    environment: "jsdom",
    setupFiles: ["./setupTests.ts"],
    watch: true,
    deps: {
      inline: ["specflow-emulator"],
    },
  },
});