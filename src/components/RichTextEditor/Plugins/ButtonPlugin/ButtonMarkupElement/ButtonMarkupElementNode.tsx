/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { CSSProperties, FC, ReactNode, useState } from 'react';
import {
    RichTextEditorContextProps,
    useRichTextEditorContext,
} from '@components/RichTextEditor/context/RichTextEditorContext';
import { ButtonRootProps } from '../components/Button';
import { ButtonStyle, TButtonElement } from '../types';
import { HTMLPropsAs, useElementProps } from '@udecode/plate';
import { ButtonStyles } from '../../TextStylePlugin/TextStyles';

const useButton = (props: ButtonRootProps): HTMLPropsAs<'a'> & { buttonStyle: ButtonStyle } => {
    const _props = useElementProps<TButtonElement, 'a'>({
        ...props,
        elementToAttributes: (element) => ({
            url: element.href,
            buttonStyle: element.buttonStyle || 'primary',
            target: element.target || '_blank',
        }),
    });

    return {
        ..._props,
        // quick fix: hovering <a> with href loses the editor focus
        //@ts-ignore
        onMouseOver: (e: MouseEvent) => {
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
            styles={getButtonStyle(context, buttonStyle)}
        >
            {children}
        </HoverableButtonLink>
    );
};

const getButtonStyle = (rteContext: RichTextEditorContextProps | null, buttonStyle: ButtonStyle) => {
    if (rteContext) {
        let styles;
        const design = rteContext.designTokens as Partial<
            Record<ButtonStyles, CSSProperties & { hover: CSSProperties }>
        >;
        switch (buttonStyle) {
            case 'primary':
                styles = design.button_primary;
                break;
            case 'secondary':
                styles = design.button_secondary;
                break;
            case 'tertiary':
                styles = design.button_tertiary;
                break;
        }
        return { ...styles, cursor: 'pointer', display: 'inline-block', margin: '10px 0' };
    }
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
