import React from "react";
import createInlineStyleButton from "../utilities/createInlineStyleButton";

export const SubButton = createInlineStyleButton({
    style: "SUBSCRIPT",
    children: (
        <div>
            x<sub>2</sub>
        </div>
    ),
});
