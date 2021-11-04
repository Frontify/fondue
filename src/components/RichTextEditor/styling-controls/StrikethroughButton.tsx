/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { InlineStyleButton } from "../InlineStyleButton";
import { InlineStyles } from "../renderer/renderInlineStyles";

export const StrikethroughButton: FC = () => (
    <InlineStyleButton style={InlineStyles.Strikethrough}>s</InlineStyleButton>
);
