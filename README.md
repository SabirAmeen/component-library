# Antigravity UI Component Library

A premium React component library built with Tailwind CSS.

## Installation

```bash
npm install @sabiraameen/component-library
```

## Setup

Since this library uses Tailwind CSS, you need to ensure your Tailwind configuration includes the library's components so it can generate the necessary styles.

### 1. Update `tailwind.config.js`

Add the library to your `content` array:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@sabiraameen/component-library/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 2. Usage

```tsx
import { Button } from '@sabiraameen/component-library';

function App() {
  return (
    <Button variant="primary">
      Click Me
    </Button>
  );
}
```

## Available Components

- **Button**: Various variants and sizes with loading states.
- **Input**: Form fields with labels and error support.
- **Checkbox**: Custom-styled checkboxes.
- **Radio**: Custom-styled radio buttons.
- **SelectBox**: Styled native selection dropdown.

## Publishing to GitHub Packages

1. Ensure you have a `.npmrc` file with your GitHub PAT:
   ```
   @sabiraameen:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
   ```
2. Build the library:
   ```bash
   npm run build
   ```
3. Publish:
   ```bash
   npm publish
   ```
