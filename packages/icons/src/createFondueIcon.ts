/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    forwardRef,
    createElement,
    type ReactSVG,
    type SVGProps,
    type ForwardRefExoticComponent,
    type RefAttributes,
} from 'react';

import { defaultAttributes } from './constants';
import { kebabCase } from './utilities/kebabCase';

export type IconNode = [elementName: keyof ReactSVG, attrs: Record<string, string>][];

export type SVGAttributes = Partial<SVGProps<SVGSVGElement>>;
type ComponentAttributes = RefAttributes<SVGSVGElement> & SVGAttributes;

type IconSizeAsNumber = 12 | 16 | 20 | 24 | 32;

/**
 * @deprecated Use a string or number instead
 */
export enum IconSize {
    Size12 = 'Size12',
    Size16 = 'Size16',
    Size20 = 'Size20',
    Size24 = 'Size24',
    Size32 = 'Size32',
}

export type FondueIconProps = ComponentAttributes & {
    size?: `${IconSizeAsNumber}` | IconSizeAsNumber | IconSize;
};

export type FondueIcon = ForwardRefExoticComponent<FondueIconProps>;

const iconSizeToNumber: Record<Exclude<FondueIconProps['size'], undefined>, IconSizeAsNumber> = {
    [IconSize.Size12]: 12,
    [IconSize.Size16]: 16,
    [IconSize.Size20]: 20,
    [IconSize.Size24]: 24,
    [IconSize.Size32]: 32,
    12: 12,
    16: 16,
    20: 20,
    24: 24,
    32: 32,
};

export const createFondueIcon = (iconName: string, iconNode: IconNode): FondueIcon => {
    const Component = forwardRef<SVGSVGElement, FondueIconProps>(
        ({ color = 'currentColor', size = 24, className = '', children, ...rest }, ref) => {
            return createElement(
                'svg',
                {
                    ref,
                    ...defaultAttributes,
                    color,
                    width: iconSizeToNumber[size],
                    height: iconSizeToNumber[size],
                    className: ['fondue', `fondue-${kebabCase(iconName)}`, className].filter(Boolean).join(' '),
                    'data-test-id': `fondue-icons-${kebabCase(iconName)}`,
                    ...rest,
                },
                [
                    ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    ...(Array.isArray(children) ? children : [children]),
                ],
            );
        },
    );

    Component.displayName = iconName;

    return Component;
};
