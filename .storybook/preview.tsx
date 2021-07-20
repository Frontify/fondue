import "../src/styles/index.css";

import { addDecorator, Story } from "@storybook/react";
import { MemoryRouter } from "react-router";

addDecorator((story: Story) => <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>);
