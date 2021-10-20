import React, { FC } from "react";
import { InlineStyleButton } from "../InlineStyleButton";

export const SupButton: FC = () => (
    <InlineStyleButton style="SUPERSCRIPT">
        <div>
            x<sup>2</sup>
        </div>
    </InlineStyleButton>
);
