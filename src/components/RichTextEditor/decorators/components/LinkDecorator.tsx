/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ContentState } from "draft-js";
import React, { ReactElement, ReactNode } from "react";

type LinkDecoratorProps = {
    children: ReactNode;
    contentState: ContentState;
    entityKey: string;
};

export default function LinkDecorator({
    children,
    contentState,
    entityKey,
}: LinkDecoratorProps): ReactElement<LinkDecoratorProps> {
    const { url, newTab } = contentState.getEntity(entityKey).getData();

    return (
        // False positive from eslint
        // eslint-disable-next-line react/jsx-no-target-blank
        <a
            href={url}
            className="tw-underline"
            target={newTab ? "_blank" : "_self"}
            rel={newTab ? "noreferrer" : ""}
            aria-label={url}
        >
            {children}
        </a>
    );
}
