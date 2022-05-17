/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps } from "@udecode/plate";
import React, { FC } from "react";

export const ChosenLinkElement: FC<PlateRenderElementProps> = ({ element, attributes, children }) => {
    const { chosenLink } = element;

    const getHref = () => {
        return chosenLink ? (chosenLink.searchResult ? element.chosenLink.searchResult.link : "") : "";
    };

    const getTarget = () => {
        const TARGET_DEFAULT = "_self";
        const TARGET_BLANK = "_blank";
        return chosenLink ? (chosenLink.openInNewTab ? TARGET_BLANK : TARGET_DEFAULT) : TARGET_DEFAULT;
    };

    return (
        <a
            data-chosen-link={JSON.stringify(chosenLink)}
            href={getHref()}
            target={getTarget()}
            rel="noreferrer"
            className="tw-text-violet-70"
            {...attributes}
        >
            {children}
        </a>
    );
};
