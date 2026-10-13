import { test, expect, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { campusLabels } from "../src/data/campusMap";

// Independent acceptance manifest: floor counts supplied by the user, not inferred.
const destinations = [
  { name: "PB", floors: 3 },
  { name: "UB", floors: 2 },
  { name: "ALB", floors: 2 },
  { name: "CSB", floors: 4 },
  { name: "CB", floors: 4 },
  { name: "FLB", floors: 4 },
  { name: "TCB", floors: 4 },
  { name: "LSB", floors: 4 },
  { name: "EAL", floors: 4 },
  { name: "BPU", floors: 1 },
  { name: "FUES", floors: 4 },
  { name: "Chemical Blending", floors: 2 },
  { name: "Fuel Blending", floors: 1 },
  { name: "SUB 115 KV", floors: 1 },
  { name: "Gas Mixing", floors: 0 },
  { name: "Waste Storage", floors: 1 },
  { name: "Parking", floors: 1 },
  { name: "GH", floors: 1 },
  { name: "POND 1", floors: 0 },
  { name: "POND 2", floors: 0 },
  { name: "POND 3", floors: 0 },
];
const artifact = resolve("ini-building-layout-standalone.html");
let errors: string[] = [];
let httpRequests: string[] = [];

async function openOffline(page: Page) {
  errors = [];
  httpRequests = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("request", (request) => {
    if (/^https?:/.test(request.url())) httpRequests.push(request.url());
  });
  let nativeFileAllowed = true;
  if (test.info().project.name !== "edge-offline") {
    const probe = await page.context().newPage();
    try {
      await probe.goto(pathToFileURL(artifact).href);
    } catch (error) {
      if (!String(error).includes("ERR_BLOCKED_BY_ADMINISTRATOR")) throw error;
      nativeFileAllowed = false;
    } finally {
      await probe.close();
    }
  }
  if (nativeFileAllowed) {
    await page.goto(pathToFileURL(artifact).href);
    await test.info().attach("offline-load-method", {
      body: "Native file:// navigation",
      contentType: "text/plain",
    });
  } else {
    // A fresh blank test page avoids the browser's blocked-navigation error page.
    // Administrator policy is preserved; this verifies only the inline document.
    await test.info().attach("offline-load-method", {
      body: "Chromium administrator blocked file://. Used setContent offline; file navigation is NOT verified in this project.",
      contentType: "text/plain",
    });
    await page.setContent(readFileSync(artifact, "utf8"), {
      waitUntil: "load",
    });
  }
  await expect(
    page.getByRole("heading", { name: "Master Layout.", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".campus-image")).toBeVisible();
  await expect(page.locator(".campus-hotspot")).toHaveCount(21);
}
async function zoomTo(page: Page, percent: number) {
  await page.getByRole("button", { name: "Reset view", exact: true }).click();
  for (let step = 100; step < percent; step += 25)
    await page.getByRole("button", { name: "ขยายแผนที่", exact: true }).click();
  await expect(page.locator(".campus-toolbar output")).toHaveText(
    `${percent}%`,
  );
}
async function verifyDetail(page: Page, name: string, floors: number) {
  const facilities = [
    "Chemical Blending",
    "Fuel Blending",
    "SUB 115 KV",
    "Gas Mixing",
    "Waste Storage",
    "Parking",
  ];
  const expectedType = name.startsWith("POND ")
    ? "Area"
    : facilities.includes(name)
      ? "Facility"
      : "Building";
  await expect(page.getByTestId("location-type")).toHaveText(expectedType);
  if (floors) {
    const title = name.length <= 4 ? `อาคาร ${name}` : name;
    await expect(
      page.getByRole("heading", { name: `${title}.`, exact: true }),
    ).toBeVisible();
    await expect(page.getByRole("tab")).toHaveCount(floors);
    for (let number = 1; number <= floors; number++) {
      const tab = page.getByRole("tab", {
        name: `ชั้น ${number}`,
        exact: true,
      });
      await tab.click();
      await expect(tab).toHaveAttribute("aria-selected", "true");
      await expect(page.locator(".plan-panel .panel-heading h3")).toContainText(
        `ชั้น ${number}`,
      );
    }
    if (!["CB", "CSB", "PB"].includes(name))
      await expect(
        page.getByText("อยู่ระหว่างจัดเตรียมข้อมูล Layout", { exact: true }),
      ).toBeVisible();
  } else {
    await expect(
      page.getByRole("heading", { name, exact: true }),
    ).toBeVisible();
    await expect(page.locator(".location-detail-card")).toContainText(
      name === "Gas Mixing" ? "รายละเอียดส่วนสนับสนุน" : "รายละเอียดพื้นที่",
    );
    await expect(page.getByRole("tab")).toHaveCount(0);
  }
  await page
    .getByRole("button", { name: "Back to Master Layout", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Master Layout.", exact: true }),
  ).toBeVisible();
}

test.afterEach(async () => {
  expect(errors).toEqual([]);
  expect(httpRequests).toEqual([]);
});
for (const percent of [100, 150, 200]) {
  test(`all 21 labels open the correct details and floors at ${percent}%`, async ({
    page,
  }) => {
    await openOffline(page);
    for (const item of destinations) {
      await zoomTo(page, percent);
      // Focus first brings clipped labels inside the panned viewport; the ensuing
      // native pointer click still checks real hit testing, not an event dispatch.
      const hotspot = page.locator(
        `[data-building=${JSON.stringify(item.name)}]`,
      );
      await hotspot.focus();
      await hotspot.scrollIntoViewIfNeeded();
      await hotspot.hover();
      await expect(page.locator(".campus-tooltip-dock")).toBeVisible();
      await expect(page.locator(".campus-tooltip-dock")).toContainText(
        item.name,
      );
      expect(
        await hotspot.evaluate((node) => getComputedStyle(node).pointerEvents),
      ).toBe("auto");
      const exposed = await hotspot.evaluate((node) => {
        const rect = node.getBoundingClientRect();
        return (
          document
            .elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2)
            ?.closest(".campus-hotspot") === node
        );
      });
      expect(
        exposed,
        `${item.name} must not be covered by another element`,
      ).toBe(true);
      await hotspot.click();
      await verifyDetail(page, item.name, item.floors);
    }
  });
}
test("all 21 coordinates scale with the original image at 3 viewports and 3 zoom levels", async ({
  page,
}) => {
  await openOffline(page);
  for (const width of [1600, 1024, 768]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const percent of [100, 150, 200]) {
      await zoomTo(page, percent);
      const geometry = await page.evaluate(() => {
        const image = document
          .querySelector(".campus-image")!
          .getBoundingClientRect();
        return {
          image: {
            x: image.x,
            y: image.y,
            width: image.width,
            height: image.height,
          },
          labels: [
            ...document.querySelectorAll<HTMLElement>(".campus-hotspot"),
          ].map((node) => {
            const r = node.getBoundingClientRect();
            return {
              id: node.dataset.building,
              x: r.x,
              y: r.y,
              width: r.width,
              height: r.height,
            };
          }),
        };
      });
      for (const label of campusLabels) {
        const rect = geometry.labels.find((item) => item.id === label.id)!;
        const img = geometry.image;
        expect(
          Math.abs(rect.x - (img.x + (img.width * label.bounds.x) / 1672)),
        ).toBeLessThan(1);
        expect(
          Math.abs(rect.y - (img.y + (img.height * label.bounds.y) / 941)),
        ).toBeLessThan(1);
        expect(
          Math.abs(rect.width - (img.width * label.bounds.width) / 1672),
        ).toBeLessThan(1);
        expect(
          Math.abs(rect.height - (img.height * label.bounds.height) / 941),
        ).toBeLessThan(1);
      }
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
  }
});
test("keyboard Enter opens every label and the map responds to keyboard pan/reset", async ({
  page,
}) => {
  await openOffline(page);
  for (const item of destinations) {
    const hotspot = page.locator(
      `[data-building=${JSON.stringify(item.name)}]`,
    );
    await hotspot.focus();
    await expect(page.locator(".campus-tooltip-dock")).toBeVisible();
    await expect(page.locator(".campus-tooltip-dock")).toContainText(item.name);
    await page.keyboard.press("Enter");
    await verifyDetail(page, item.name, item.floors);
  }
  await page.locator(".campus-viewport").focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".campus-image-frame")).toHaveAttribute(
    "style",
    /translate\(-40px, 0px\)/,
  );
  await page.keyboard.press("0");
  await expect(page.locator(".campus-image-frame")).toHaveAttribute(
    "style",
    /translate\(0px, 0px\)/,
  );
});
test("tablet touch opens building and pond details; pointer pan and reset work", async ({
  browser,
}) => {
  const context = await browser.newContext({
    offline: true,
    hasTouch: true,
    viewport: { width: 1024, height: 768 },
  });
  const page = await context.newPage();
  await openOffline(page);
  for (const item of [destinations[4], destinations[18]]) {
    const hotspot = page.locator(
      `[data-building=${JSON.stringify(item.name)}]`,
    );
    await hotspot.focus();
    await hotspot.scrollIntoViewIfNeeded();
    await hotspot.tap();
    await verifyDetail(page, item.name, item.floors);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  const view = await page.locator(".campus-viewport").boundingBox();
  await page.mouse.move(view!.x + 5, view!.y + 5);
  await page.mouse.down();
  await page.mouse.move(view!.x + 55, view!.y + 35, { steps: 5 });
  await page.mouse.up();
  await expect(page.locator(".campus-image-frame")).toHaveAttribute(
    "style",
    /translate\(50px, 30px\)/,
  );
  await zoomTo(page, 100);
  await expect(page.locator(".campus-image-frame")).toHaveAttribute(
    "style",
    /translate\(0px, 0px\)/,
  );
  await context.close();
});
test("standalone preserves original image bytes and captures numbered inspection board", async ({
  page,
}) => {
  await openOffline(page);
  const src = await page.locator(".campus-image").getAttribute("src");
  expect(src?.startsWith("data:image/png;base64,")).toBe(true);
  expect(
    Buffer.from(src!.split(",")[1], "base64").equals(
      readFileSync("src/assets/campus-original.png"),
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "ตรวจตำแหน่ง Hotspot" }).click();
  await expect(page.locator(".campus-review-number")).toHaveCount(21);
  await expect(page.locator(".campus-review-directory li")).toHaveCount(21);
  for (const item of destinations)
    await expect(page.locator(".campus-review-directory")).toContainText(
      item.name,
    );
  await page.evaluate(() => window.scrollTo(0, 0));
  await page
    .locator(".campus-panel")
    .screenshot({ path: test.info().outputPath("hotspot-inspection.png") });
});

test("confirmed KPIs remain 3 buildings / 11 floors even after visiting unconfirmed destinations", async ({
  page,
}) => {
  await openOffline(page);
  async function verifyKpis() {
    const cards = page.locator(".stats-grid .stat");
    await expect(cards.nth(0)).toContainText("อาคารที่ยืนยันแล้ว");
    await expect(cards.nth(0).locator("strong")).toHaveText(/03\s*อาคาร/);
    await expect(cards.nth(1)).toContainText("จำนวนชั้นที่ยืนยันแล้ว");
    await expect(cards.nth(1).locator("strong")).toHaveText(/11\s*ชั้น/);
    await expect(cards.nth(2).locator("strong")).toHaveText(/09\s*ชั้น/);
    await expect(cards.nth(3).locator("strong")).toHaveText(/00\s*\/ 11 ชั้น/);
  }
  await verifyKpis();
  for (const name of ["FLB", "Parking", "Gas Mixing", "POND 1"]) {
    await page.locator(`[data-building=${JSON.stringify(name)}]`).click();
    await expect(page.getByTestId("location-type")).toBeVisible();
    await verifyKpis();
    await page
      .getByRole("button", { name: "Back to Master Layout", exact: true })
      .click();
  }
});

test("local floor image import works offline and adds no room hotspots or verification status", async ({
  page,
}) => {
  await openOffline(page);
  const sample = readFileSync("src/assets/campus-original.png"); // Image-decoding fixture only, never added to floor data.
  for (const id of ["CB", "CSB", "PB"]) {
    await page.locator(`[data-building=${JSON.stringify(id)}]`).click();
    await page
      .getByRole("button", { name: "นำเข้าภาพแปลน", exact: true })
      .first()
      .click();
    if (id === "PB") {
      await expect(
        page.getByRole("button", {
          name: "เลือกภาพแปลนจากอุปกรณ์",
          exact: false,
        }),
      ).toBeDisabled();
      await page.getByRole("checkbox").check();
    }
    await page
      .locator("input[type=file]")
      .setInputFiles({
        name: "qa-image-decode-only.png",
        mimeType: "image/png",
        buffer: sample,
      });
    await expect(page.locator(".plan-image img")).toBeVisible();
    await expect(page.locator(".plan-image img")).toHaveAttribute(
      "src",
      /^blob:/,
    );
    await expect(page.locator(".area-hotspot")).toHaveCount(0);
    await page
      .getByRole("button", { name: "Back to Master Layout", exact: true })
      .click();
  }
  await expect(
    page.locator(".stats-grid .stat").nth(2).locator("strong"),
  ).toHaveText(/09\s*ชั้น/);
  await expect(
    page.locator(".stats-grid .stat").nth(3).locator("strong"),
  ).toHaveText(/03\s*\/ 11 ชั้น/);
});
