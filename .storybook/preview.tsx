import "../src/styles/index.css";

import { addDecorator, Story } from "@storybook/react";
import { MemoryRouter } from "react-router";
import { light, dark } from "./frontifyTheme";

addDecorator((story: Story) => <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>);

export const parameters = {
    options: {
        storySort: {
            order: ["Elements", "Components", "Compositions"],
        },
    },
    darkMode: {
        darkClass: "dark",
        classTarget: "html",
        stylePreview: true,
        dark: { ...dark },
        light: { ...light },
    },
};
