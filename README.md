# Geostorm 🌦️

A weather app built with the Next.js App Router: real-time conditions, hourly and 7-day forecasts, automatic location detection, and unit preferences that persist in the URL.

[Live demo →](https://geostorm-weathernow.vercel.app/)

## Features

- **Automatic location detection:** asks for the device's location on load, and falls back to London if permission is denied or unavailable
- **City search:** debounced search-as-you-type with a list of matching places, plus loading and no-results states
- **Unit switching (metric / imperial):** temperature, wind speed and precipitation units are stored in the URL's query string, so preferences survive a refresh or a shared link
- **Skeleton loading states:** every data-driven section has a matching skeleton, so the layout doesn't jump as data arrives
- **Error handling:** a dedicated error state with a retry button, rather than a silent failure or blank screen

## Accessibility

- **Search** is an ARIA combobox built on Base UI's Autocomplete: the input is wired to its list, arrow keys move through results, Enter selects, and loading is announced through a live status region
- **Weather icons** have alt text describing the conditions ("Light rain", "Overcast") rather than a generic label
- **Daily highs and lows** have visually hidden labels, so screen readers say "High 20°, Low 14°" instead of two bare numbers
- **Headings** follow a logical order, so screen reader users can jump between sections
- **The no-results message** is announced as a status update
- **Menus and dropdowns** use Base UI for keyboard navigation and correct roles

### Automated testing

`tests/a11y.spec.ts` uses Playwright and axe to check WCAG 2.1 AA in four states: the loaded forecast, the units menu open, live search results, and the no-results message.

One rule (`aria-hidden-focus`) is skipped only while search results are open. Base UI deliberately hides the rest of the page from screen readers while the list is open, and focus never leaves the input, so the hidden controls can't be reached. Tab or Escape closes the list and restores the page. The exception is scoped to those two tests and documented in the spec.

## Tech stack

| | |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| UI library | React 19 |
| Data fetching / caching | TanStack Query |
| Component primitives | Base UI |
| Styling | CSS Modules |
| Weather data | Open-Meteo (forecast and geocoding, no API key required) |
| Icons | Lucide |
| Testing | Playwright + axe |

## Architecture notes

- `data/api/`: thin fetch wrappers around the Open-Meteo endpoints (forecast, reverse geocoding, city search), kept separate from React so they're easy to test or swap
- `data/queries/`: TanStack Query hooks (`useWeather`, `useDeviceLocation`, `useReverseGeocode`, `useCitySearch`) that add caching, loading and error states
- `hooks/useUnits.ts`: reads and writes unit preferences to the URL with `useSearchParams` and `router.replace`, so they're shareable and survive a refresh without any client-side storage
- `components/`: presentational components paired one-to-one with their CSS Module, plus a `skeletons/` folder for loading placeholders

## Getting started

```bash
git clone https://github.com/ocodner-7/geostorm.git
cd geostorm
npm install
npm run dev
```

Open http://localhost:3000. No environment variables or API keys are needed, since Open-Meteo's endpoints are public.

### Running the accessibility tests

The tests expect the app on port 3001:

```bash
npm run dev -- -p 3001
npx playwright test tests/a11y.spec.ts --project=chromium
```

## Design reference

The visual design comes from a Frontend Mentor challenge. Mockups for each state (metric and imperial, loading, hover, focus, dropdown, error and no results) are in `public/design/` and were used as the source of truth during the build.
