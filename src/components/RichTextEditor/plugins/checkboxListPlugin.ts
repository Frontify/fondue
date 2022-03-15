/* (c) Copyright Frontify Ltd., all rights reserved. */

import { onKeyDownList, withList } from "@udecode/plate";
import { createPluginFactory } from "@udecode/plate-core";

export const ELEMENT_CHECK_LIST = "checkbox_list";
export const ELEMENT_CHECK_ITEM = "checkbox_item";

// inspired from https://github.com/udecode/plate/blob/27228226801327665f27647585d20bc99adf1111/packages/nodes/list/src/createListPlugin.ts

export const createCheckboxListPlugin = createPluginFactory({
    key: "checkbox",
    plugins: [
        {
            key: ELEMENT_CHECK_LIST,
            isElement: true,
            handlers: {
                onKeyDown: onKeyDownList,
            },
            withOverrides: withList,
        },
        {
            key: ELEMENT_CHECK_ITEM,
            isElement: true,
        },
    ],
});
