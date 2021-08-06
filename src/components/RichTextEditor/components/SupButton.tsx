import React from "react";
import createInlineStyleButton from "../utilities/createInlineStyleButton";

export const SupButton = createInlineStyleButton({
    style: "SUPERSCRIPT",
    children: (
        <div>
            x<sup>2</sup>
        </div>
    ),
});
