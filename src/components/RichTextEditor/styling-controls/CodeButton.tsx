/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconSnippet from "src/foundation/Icon/Generated/IconSnippet";
import { IconSize } from "src/foundation/Icon/IconSize";
import React, { FC } from "react";
import { InlineStyleButton } from "../InlineStyleButton";

export const CodeButton: FC = () => (
    <InlineStyleButton style="CODE">
        <IconSnippet size={IconSize.Size16} />
    </InlineStyleButton>
);
