import React, { FC } from "react";
import { InlineStyleButton } from "../InlineStyleButton";

export const SubButton: FC = () => (
    <InlineStyleButton style="SUBSCRIPT">
        <div>
            x<sub>2</sub>
        </div>
    </InlineStyleButton>
);
