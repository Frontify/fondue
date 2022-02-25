/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { ModalVisualProps } from "./types";
import { PatternDesign, PatternScale } from "@foundation/Pattern";
import { FrontifyPattern } from "@components/FrontifyPattern/FrontifyPattern";

export const ModalVisual: FC<ModalVisualProps> = () => {
    return (
        <div data-test-id="modal-visual" className="tw-w-[260px] tw-relative tw-overflow-hidden">
            <FrontifyPattern pattern={PatternDesign.Sound} scale={PatternScale.Small} />
        </div>
    );
};
