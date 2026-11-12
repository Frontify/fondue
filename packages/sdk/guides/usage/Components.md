# Components

## Finding components

You can browse all available components in the Storybook instance of the [Fondue design system](https://fondue-components.frontify.com).
This Storybook contains all components from all subpackages in the Fondue monorepo. Each component will have a badge in the top bar indicating its current lifecycle state.

For the designers, the documentation is available in the [Fondue design system documentation](https://fondue.frontify.com/).

## Using components

If you want to use a component, you can import them through the `@frontify/fondue/components` subpackage from Fondue.

```tsx
import { Button } from '@frontify/fondue/components';

const App = () => <Button>Click Me</Button>;
```

## Legacy components

Fondue 14 removed the legacy components and the root `@frontify/fondue` entry. Import components from `@frontify/fondue/components`. The [migration guide](https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md) maps each legacy component to its replacement.
