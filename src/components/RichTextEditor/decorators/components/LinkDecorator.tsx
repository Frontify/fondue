import React, { ReactElement, ReactNode } from "react";
import { ContentState } from "draft-js";

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
            style={{ color: "red" }}
            target={newTab ? "_blank" : "_self"}
            rel={newTab ? "noreferrer" : ""}
            aria-label={url}
        >
            {children}
        </a>
    );
}
