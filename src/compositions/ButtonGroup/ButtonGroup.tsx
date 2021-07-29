/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Size } from "@elements/Button/Button";
import { merge } from "@utilities/merge";
import { Children, cloneElement, isValidElement, PropsWithChildren, ReactElement } from "react";

export type ButtonGroupProps = PropsWithChildren<{ size: Size }>;

const spacing: Record<Size, string> = {
    [Size.Small]: "gap-x-1",
    [Size.Medium]: "gap-x-2",
    [Size.Large]: "gap-x-3",
};

export default function ButtonGroup({ children, size }: ButtonGroupProps): ReactElement<ButtonGroupProps> {
    return (
        <div data-test-id="button-group" className={merge(["display inline-flex flex-row", spacing[size]])}>
            {Children.map(children, (child) => {
                if (!isValidElement(child)) {
                    return null;
                }

                return cloneElement(child, { size });
            })}
        </div>
    );
}
