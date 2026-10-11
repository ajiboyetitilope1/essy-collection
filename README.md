# ESSY Collection — Mobile

A mobile-first fashion storefront built with Expo, React Native, TypeScript, and Expo Router. The visual direction follows the ESSY Figma mobile flow: warm paper tones, olive and rust accents, editorial serif headlines, and considered product photography.

## Run locally

```sh
npm install
npx expo start
```

Use the Expo Go app to open the project, or press **w** in the terminal to open the web preview.

## Screens

- **Home** — seasonal edit, category shortcuts, and featured pieces
- **New arrivals** — searchable, filterable, sortable product grid
- **Product detail** — item details, colour and size selection, save, and add to bag
- **Shopping bag** — quantity controls, delivery threshold, and order summary
- **Checkout** — contact, address, delivery, payment selection, and order confirmation
- **Saved pieces** and **Account** — supporting storefront tabs

## Structure

- `src/app` — route screens and navigation layouts
- `src/components` — reusable product, button, field, and layout components
- `src/data` — product catalog
- `src/providers` — cart and saved-item state
- `src/theme` — shared colors, spacing, type, and radii

The cart, saved items, and checkout are local prototype state. Product imagery is loaded from Unsplash. Connect catalog, customer, inventory, and payment services before using this as a live store.

## Project checks

```sh
npm run typecheck
npm run lint
npx expo export --platform web
```
