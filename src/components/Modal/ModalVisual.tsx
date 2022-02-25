/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import { ModalVisualProps } from "./types";
import { PatternScale } from "@foundation/Pattern";
import { FrontifyPattern } from "@components/FrontifyPattern/FrontifyPattern";

export const ModalVisual: FC<ModalVisualProps> = ({ pattern }) => {
    return (
        <div data-test-id="modal-visual" className="tw-w-[260px] tw-relative tw-overflow-hidden">
            <FrontifyPattern pattern={pattern} scale={PatternScale.Small} />
        </div>
    );
};
