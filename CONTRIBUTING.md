# Contributing to Component Library

First off, thank you for considering contributing to our component library!

## Development Guidelines

### 1. Adding New Components
When adding a new component to `src/components/ui/`, ensure that you follow the established design patterns and use existing design tokens or styles where applicable.

### 2. Storybook Requirement (Enforced)
**All new components MUST have an accompanying Storybook story.** 
- The story should be named `[ComponentName].stories.tsx` and placed in the same directory as the component.
- Cover standard states (default, disabled, loading, varied sizes/colors if applicable).
- Document component `props` accurately so they appear in Storybook's Autodocs.

### 3. Local Setup
Ensure you have correct node version via \`nvm use\` or check the \`package.json\`.
Install dependencies with:
\`\`\`bash
npm install
\`\`\`

To start Storybook locally:
\`\`\`bash
npm run storybook
\`\`\`

### 4. Running the Build
Ensure the component library builds successfully before submitting changes:
\`\`\`bash
npm run build
\`\`\`

Any Pull Request that adds a new component without an accompanying Storybook file will not be accepted.
