/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { InlineStyleButton } from "../InlineStyleButton";
import { Styles } from "../InlineStyles";

export const StrikethroughButton: FC = () => <InlineStyleButton style={Styles.Strikethrough}>s</InlineStyleButton>;
