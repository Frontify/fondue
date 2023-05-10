/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useRichTextEditorContext } from '@components/RichTextEditor/context/RichTextEditorContext';
import { HTMLPropsAs, PlateRenderElementProps, Value, useElementProps } from '@udecode/plate';
import React, { CSSProperties, ReactElement, ReactNode, useState } from 'react';
import { RichTextButtonStyle, TButtonElement } from '../types';

export type ButtonRootProps = PlateRenderElementProps<Value, TButtonElement> & HTMLPropsAs<'a'>;

const useButton = (props: ButtonRootProps): HTMLPropsAs<'a'> & { buttonStyle: RichTextButtonStyle } => {
    const _props = useElementProps<TButtonElement, 'a'>({
        ...props,
        elementToAttributes: (element) => ({
            url: element.href,
            buttonStyle: element.buttonStyle || 'primary',
            target: element.target || '_blank',
        }),
    });

    return {
        ...(_props as HTMLPropsAs<'a'> & { buttonStyle: RichTextButtonStyle }),
        // quick fix: hovering <a> with href loses the editor focus
        onMouseOver: (e) => {
            e.stopPropagation();
        },
    };
};

export const ButtonMarkupElementNode = (props: ButtonRootProps) => {
    const context = useRichTextEditorContext();
    const { href, target, buttonStyle } = useButton(props);
    const { attributes, children } = props;

    return (
        <HoverableButtonLink
            attributes={attributes}
            href={href}
            target={target}
            styles={context ? getButtonStyleCssProperties(buttonStyle) : undefined}
        >
            {children}
        </HoverableButtonLink>
    );
};

export const getButtonStyleCssProperties = (
    buttonStyle: RichTextButtonStyle,
): CSSProperties & { hover: CSSProperties } => {
    const styles = {
        fontSize: `var(--f-theme-settings-button-${buttonStyle}-font-size)`,
        color: `var(--f-theme-settings-button-${buttonStyle}-color)`,
        paddingTop: `var(--f-theme-settings-button-${buttonStyle}-padding-top)`,
        paddingRight: `var(--f-theme-settings-button-${buttonStyle}-padding-right)`,
        paddingBottom: `var(--f-theme-settings-button-${buttonStyle}-padding-bottom)`,
        paddingLeft: `var(--f-theme-settings-button-${buttonStyle}-padding-left)`,
        fontFamily: `var(--f-theme-settings-button-${buttonStyle}-font-family)`,
        fontStyle: `var(--f-theme-settings-button-${buttonStyle}-font-style)`,
        fontWeight: `var(--f-theme-settings-button-${buttonStyle}-font-weight)`,
        textTransform: `var(--f-theme-settings-button-${buttonStyle}-text-transform)` as CSSProperties['textTransform'],
        lineHeight: `var(--f-theme-settings-button-${buttonStyle}-line-height)`,
        borderColor: `var(--f-theme-settings-button-${buttonStyle}-border-color)`,
        borderWidth: `var(--f-theme-settings-button-${buttonStyle}-border-width)`,
        borderRadius: `var(--f-theme-settings-button-${buttonStyle}-border-radius)`,
        backgroundColor: `var(--f-theme-settings-button-${buttonStyle}-background-color)`,
        hover: {
            color: `var(--f-theme-settings-button-${buttonStyle}-hover-color)`,
            borderColor: `var(--f-theme-settings-button-${buttonStyle}-hover-border-color)`,
            backgroundColor: `var(--f-theme-settings-button-${buttonStyle}-hover-background-color)`,
        },
    };
    return { ...styles, cursor: 'pointer', display: 'inline-block', margin: '10px 0' };
};

type Props = {
    attributes: ButtonRootProps['attributes'];
    children: ReactNode;
    styles?: React.CSSProperties & { hover?: React.CSSProperties };
    href?: string;
    target?: React.HTMLAttributeAnchorTarget;
};

const HoverableButtonLink = ({
    attributes,
    styles = { hover: {} },
    children,
    href = '#',
    target,
}: Props): ReactElement => {
    const [hovered, setHovered] = useState(false);

    return (
        <a
            {...attributes}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            href={href}
            target={target}
            style={hovered ? { ...styles, ...styles.hover } : styles}
        >
            {children}
        </a>
    );
};
