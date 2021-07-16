import { addDecorator, Story } from "@storybook/react";
import { MemoryRouter } from "react-router";

addDecorator((story: Story) => <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>);

export const parameters = {
    options: {
        storySort: {
            order: ["Elements", "Components", "Compositions"],
        },
    },
};
