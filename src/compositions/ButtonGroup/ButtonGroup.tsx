/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Size } from "@elements/Button/Button";
import { merge } from "@utilities/merge";
import { Children, isValidElement, ReactElement, ReactNode, useMemo } from "react";

export type ButtonGroupProps = { children: ReactNode };

const sizeOrder = Object.values(Size);

const spacing: Record<Size, string> = {
    [Size.Small]: "mr-1",
    [Size.Medium]: "mr-2",
    [Size.Large]: "mr-3",
};

export default function ButtonGroup({ children }: ButtonGroupProps): ReactElement<ButtonGroupProps> {
    const size: Size = useMemo(() => {
        const sizes: Size[] = [];

        Children.forEach(children, (child) => {
            if (!isValidElement(child)) {
                return;
            }

            const { size } = child.props;

            if (Object.values(Size).includes(size)) {
                sizes.push(size);
            }

            return;
        });

        return sizes.reduce((acc, cur) => {
            if (sizeOrder.indexOf(cur) > sizeOrder.indexOf(acc)) {
                return cur;
            }

            return acc;
        }, sizes[0] || Size.Medium);
    }, [children]);

    return (
        <div data-test-id="button-group" className="display inline-flex flex-row">
            {Children.map(children, (child) => (
                <span className={merge(["last:mr-0", spacing[size]])}>{child}</span>
            ))}
        </div>
    );
}
