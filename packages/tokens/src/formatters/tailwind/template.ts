/* (c) Copyright Frontify Ltd., all rights reserved. */

type TemplateOptions = {
    theme: Record<string, unknown>;
    plugin: Record<string, unknown>;
};

export const template = ({ theme, plugin }: TemplateOptions) => {
    return `const plugin = require('tailwindcss/plugin')

  export default {
      darkMode: "class",
      prefix: "tw-",
      theme: ${JSON.stringify(theme)},
      plugins: [
      plugin(function({ addComponents}) {
        const components = ${JSON.stringify(plugin)};
        addComponents(components);
        })
      ]
  }`;
};

export const templateDebug = ({ theme, plugin }: TemplateOptions) => {
    return `const plugin = require('tailwindcss/plugin')

  export default {
      darkMode: "class",
      prefix: "tw-",
      safelist: [{ pattern: /.*/ }],
      theme: ${JSON.stringify(theme)},
      plugins: [
      plugin(function({ addComponents}) {
        const components = ${JSON.stringify(plugin)};
        addComponents(components);
        })
      ]
  }`;
};
