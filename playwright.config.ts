import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  timeout: 120_000,
  expect: { timeout: 10_000 },
  workers: 1,
  reporter: [["list"], ["json", { outputFile: "test-results/results.json" }]],
  outputDir: "test-results",
  use: {
    offline: true,
    viewport: { width: 1600, height: 1000 },
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium-offline",
      use: {
        launchOptions: { executablePath: process.env.INI_CHROMIUM_EXECUTABLE },
      },
    },
    ...(process.env.INI_EDGE_EXECUTABLE
      ? [
          {
            name: "edge-offline",
            use: {
              launchOptions: {
                executablePath: process.env.INI_EDGE_EXECUTABLE,
              },
            },
          },
        ]
      : []),
  ],
});
