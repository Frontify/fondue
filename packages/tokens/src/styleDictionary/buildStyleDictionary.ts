import StyleDictionary, { type Token } from "style-dictionary";
import { type Config } from "../types";
import { tailwindFormat } from "./tailwind/tailwindFormat";

StyleDictionary.registerTransform({
  type: `value`,
  transitive: true,
  name: `figma/colorToScaledRgbaString`,
  filter: (token) => {
    return (
      token.type === "color" &&
      token.value.hasOwnProperty("r") &&
      token.value.hasOwnProperty("g") &&
      token.value.hasOwnProperty("b") &&
      token.value.hasOwnProperty("a")
    );
  },
  transform: (token) => {
    return `rgba(${Math.round(token.value.r * 255)}, ${Math.round(token.value.g * 255)}, ${Math.round(token.value.b * 255)}, ${token.value.a})`;
  },
});

StyleDictionary.registerTransform({
  type: `value`,
  transitive: true,
  name: `value/refToCSSVariable`,
  filter: (token) => {
    return typeof token.value === "string" && token.value.startsWith("ref_");
  },
  transform: (token) => {
    return `var(--${token.value.replace("ref_", "").replace(/\//g, "-")})`;
  },
});

StyleDictionary.registerTransform({
  type: `name`,
  transitive: true,
  name: `name/kebabWithoutThemeName`,
  transform: (token) => {
    return token.path.slice(1).join("-");
  },
});

StyleDictionary.registerTransform({
  type: `value`,
  transitive: true,
  name: `tailwind/nameToCSSVariable`,
  transform: (token) => {
    return `var(--${token.name.replace(/\//g, "-")})`;
  },
});

StyleDictionary.registerFormat(tailwindFormat);

export const buildStyleDictionary = (config: Config) => {
  const allTokensPath = new URL("../../.tmp/tokens/all-tokens.json", import.meta.url).pathname;
  return new StyleDictionary({
    source: [allTokensPath],
    platforms: {
      cssBase: {
        buildPath: "dist/",
        transforms: ["figma/colorToScaledRgbaString", "name/kebabWithoutThemeName", "value/refToCSSVariable"],
        options: {
          showFileHeader: false,
        },
        files: [
          {
            filter: (token) => {
              return token.attributes?.type === "primitive" || token.attributes?.theme === config.defaultTheme;
            },
            destination: "css/base.css",
            format: "css/variables",
          },
        ],
      },
      cssThemes: {
        buildPath: ".tmp/themes/",
        transforms: ["figma/colorToScaledRgbaString", "name/kebabWithoutThemeName", "value/refToCSSVariable"],
        options: {
          showFileHeader: false,
        },
        files: [
          {
            filter: (token) => {
              return token.attributes?.type === "primitive";
            },
            destination: "primitives.css",
            options: {
              selector: ".primitives",
            },
            format: "css/variables",
          },
          ...config.themes.map((theme) => ({
            filter: (token: Token) => {
              if (token.attributes?.type == "theme") {
                return token.attributes.theme === theme;
              }
              return token.attributes?.type !== "primitive" && token.type !== "color";
            },
            destination: `${theme}.css`,
            options: {
              selector: `.${theme}`,
            },
            format: "css/variables",
          })),
        ],
      },

      tailwind: {
        buildPath: "dist/tailwind/",
        transforms: ["figma/colorToScaledRgbaString", "tailwind/nameToCSSVariable"],
        files: [
          {

            destination: "tailwind.config.js",
            format: "tailwind",
          },
        ],
      },
    },
  }).buildAllPlatforms();


}





