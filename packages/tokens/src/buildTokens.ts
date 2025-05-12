import Bun from "bun";
import { rm } from "node:fs/promises";
import { loadFigmaVariables } from "./loadFigmaVariables";
import { buildStyleDictionary } from "./styleDictionary/buildStyleDictionary";
import { type Config } from "./types";


const buildTokens = async () => {

  const config: Config = await Bun.file("config.json").json()
  await loadFigmaVariables(config);
  await buildStyleDictionary(config)

  let themeStyles = "";
  Promise.all([Bun.file(new URL("../.tmp/themes/primitives.css", import.meta.url)).text().then(content => {
    themeStyles += content + "\n";
  }), ...config.themes.map(async (theme) => {
    return Bun.file(new URL(`../.tmp/themes/${theme}.css`, import.meta.url)).text().then(content => {
      themeStyles += content + "\n";
    });
  })]).then(() =>
    Bun.write(new URL("../dist/themes/themes.module.css", import.meta.url), themeStyles)
  ).then(() => {
    rm(new URL("../.tmp", import.meta.url), { recursive: true, force: true })
  });

  const moduleTypesTemplate = `declare const styles: {
      primitives: string;
      ${config.themes.map(theme => `
      ${theme}: string;`).join("\n")}
    };
    export default styles;`

  Bun.write(new URL("../dist/themes/themes.module.css.d.ts", import.meta.url), moduleTypesTemplate);
};


buildTokens();



