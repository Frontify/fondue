import React from "react";
import IconHeader from "@elements/Icon/Generated/IconHeader";
import { IconSize } from "@elements/Icon/IconSize";
import createBlockStyleButton from "../utilities/createBlockStyleButton";

//TODO: Styling not working: https://app.clickup.com/t/1mjnru0
export const H3Button = createBlockStyleButton({
    blockType: "header-three",
    children: (
        <>
            <IconHeader size={IconSize.Size12} />
            <span>3</span>
        </>
    ),
});
