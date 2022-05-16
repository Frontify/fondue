/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext } from "react";
import { ModalPadding, ModalPaddingType } from "../types";

export const paddingMap: Record<ModalPadding, ModalPaddingType> = {
    [ModalPadding.Default]: {
        top: "tw-pt-14",
        horizontal: "tw-px-14",
        bottom: "tw-pb-14",
    },
    [ModalPadding.Compact]: {
        top: "tw-pt-6",
        horizontal: "tw-px-6",
        bottom: "tw-pb-6",
    },
};

export const ModalLayout = createContext({ padding: paddingMap[ModalPadding.Default] });
