import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

async function expectNoViolations(page: Page, disableRules: string[] = []) {
  const results = await new AxeBuilder({ page })
    .withTags(WCAG_TAGS)
    .exclude(".tsqd-parent-container")
    .exclude("nextjs-portal")
    .disableRules(disableRules)
    .analyze();
  expect(results.violations).toEqual([]);
}

// While suggestions are open, Base UI hides the page from screen readers on
// purpose, and focus stays in the input. Tab or Escape closes the list and
// un-hides the page, so nothing hidden is ever reachable.
const OPEN_SEARCH_EXCEPTIONS = ["aria-hidden-focus"];

// Pretend the browser is in London, so the forecast loads without a prompt
test.use({
  geolocation: { latitude: 51.5074, longitude: -0.1278 },
  permissions: ["geolocation"],
});

async function loadForecast(page: Page) {
  await page.goto("/");
  // Wait for the weather and geocoding requests to finish, so the scan sees
  // the real forecast rather than skeletons
  await page.waitForLoadState("networkidle");
}

test.describe("Accessibility", () => {
  test("loaded forecast has no WCAG violations", async ({ page }) => {
    await loadForecast(page);
    await expectNoViolations(page);
  });

  test("units menu open has no WCAG violations", async ({ page }) => {
    await loadForecast(page);
    // If this selector misses, record the click with codegen and paste it here
    await page.getByRole("button", { name: /units/i }).click();
    await expect(page.getByRole("menu")).toBeVisible();
    await expectNoViolations(page);
  });

  test("search suggestions have no WCAG violations", async ({ page }) => {
    await loadForecast(page);
    // If this selector misses, record typing into the search with codegen
    await page.getByPlaceholder(/search/i).fill("Manchester");
    await page.waitForLoadState("networkidle");
    await expectNoViolations(page, OPEN_SEARCH_EXCEPTIONS);
  });

  test("no results state has no WCAG violations", async ({ page }) => {
    await loadForecast(page);
    await page.getByPlaceholder(/search/i).fill("zzzzzzzz");
    await expect(page.getByText(/no search result/i)).toBeVisible();
    await expectNoViolations(page, OPEN_SEARCH_EXCEPTIONS);
  });
});