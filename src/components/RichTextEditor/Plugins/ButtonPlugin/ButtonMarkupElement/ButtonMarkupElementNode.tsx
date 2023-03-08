/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useRichTextEditorContext } from '@components/RichTextEditor/context/RichTextEditorContext';
import { DesignTokens } from '@components/RichTextEditor/types';
import { HTMLPropsAs, PlateRenderElementProps, Value, useElementProps } from '@udecode/plate';
import React, { CSSProperties, FC, ReactNode, useState } from 'react';
import { ButtonStyles } from '../../TextStylePlugin/TextStyles';
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
            styles={context ? getButtonStyle(context.designTokens, buttonStyle) : undefined}
        >
            {children}
        </HoverableButtonLink>
    );
};

export const getButtonStyle = (designTokens: DesignTokens, buttonStyle: RichTextButtonStyle) => {
    let styles;
    const design = designTokens as Partial<Record<ButtonStyles, CSSProperties & { hover: CSSProperties }>>;
    switch (buttonStyle) {
        case 'primary':
            styles = design.buttonPrimary;
            break;
        case 'secondary':
            styles = design.buttonSecondary;
            break;
        case 'tertiary':
            styles = design.buttonTertiary;
            break;
    }
    return { ...styles, cursor: 'pointer', display: 'inline-block', margin: '10px 0' };
};

type Props = {
    attributes: ButtonRootProps['attributes'];
    children: ReactNode;
    styles?: React.CSSProperties & { hover?: React.CSSProperties };
    href?: string;
    target?: React.HTMLAttributeAnchorTarget;
};

const HoverableButtonLink: FC<Props> = ({ attributes, styles = { hover: {} }, children, href = '#', target }) => {
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
