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

If you need to use a legacy component (indicated by a [legacy] badge in the Storybook top bar), you can continue to import them directly from the `@frontify/fondue` package.

```tsx
import { Button } from '@frontify/fondue';

const App = () => <Button>Click Me</Button>;
```
