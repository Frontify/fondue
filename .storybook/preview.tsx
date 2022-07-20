import "../src/styles.css";
import { dark, light } from "./frontifyTheme";
import { withPerformance } from 'storybook-addon-performance';

export const parameters = {
    options: {
        storySort: {
            order: ["Tokens", "Layout", "Typography", "Components"],
        },
    },
    darkMode: {
        darkClass: "tw-dark",
        classTarget: "html",
        stylePreview: true,
        dark: { ...dark },
        light: { ...light },
    },
};

export const decorators = [withPerformance];
