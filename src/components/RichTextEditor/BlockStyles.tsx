import React, { FC } from "react";
import { DefaultElement, RenderElementProps } from "slate-react";

export enum Styles {
    Code = "code",
}

export const BlockStyles: FC<RenderElementProps> = (props) => {
    switch (props.element.type) {
        case "code":
            return (
                <span {...props.attributes} className="tw-font-bold">
                    {props.children}
                </span>
            );
        default:
            return <DefaultElement {...props} />;
    }
};
