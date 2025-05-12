import { type Dictionary } from "style-dictionary";
import { buildTheme } from "./buildTheme";
import { buildTextUtil } from "./buildUtils";

export const tailwindFormat = {
  name: "tailwind",
  format: ({ dictionary }: { dictionary: Dictionary }) => {
    const theme = buildTheme({ dictionary });
    const utils = buildTextUtil({ dictionary });
    return template(theme, utils);
  },
};

const template = (theme: Record<string, unknown>, plugins: string) => {
  return `import plugin from 'tailwindcss/plugin';
  
  export default {
      darkMode: "class",
      prefix: "tw-",
      theme: ${JSON.stringify(theme)},
      plugins: [${plugins}],
  };`;
};
