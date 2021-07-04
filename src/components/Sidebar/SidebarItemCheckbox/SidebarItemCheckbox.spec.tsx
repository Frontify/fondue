/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import SidebarItemCheckbox from "./SidebarItemCheckbox";

describe("Sidebar Item Checkbox component", () => {
    it("renders", () => {
        mount(<SidebarItemCheckbox label="foo" onChange={() => null} />);
    });
});
