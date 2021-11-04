/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconSnippet from "@foundation/Icon/Generated/IconSnippet";
import { IconSize } from "@foundation/Icon/IconSize";
import React, { FC } from "react";
import { InlineStyleButton } from "../InlineStyleButton";

export const CodeButton: FC = () => (
    <InlineStyleButton style="CODE">
        <IconSnippet size={IconSize.Size16} />
    </InlineStyleButton>
);
