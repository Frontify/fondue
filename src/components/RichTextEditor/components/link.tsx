/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps } from "@udecode/plate";
import React, { FC } from "react";

export const LinkElement: FC<PlateRenderElementProps> = ({ element, attributes, children }) => {
    const { chosenLink } = element;

    return (
        <a
            data-chosen-link={JSON.stringify(chosenLink)}
            href={chosenLink ? (chosenLink.searchResult ? element.chosenLink.searchResult.link : "") : ""}
            rel="noreferrer"
            target={chosenLink ? (chosenLink.openInNewTab ? "_blank" : "_self") : "_self"}
            className="tw-text-violet-70"
            {...attributes}
        >
            {children}
        </a>
    );
};
