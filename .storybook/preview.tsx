import "tailwindcss/tailwind.css";
import { dark, light } from "./frontifyTheme";

export const parameters = {
    options: {
        storySort: {
            order: ["Elements", "Components", "Compositions"],
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
