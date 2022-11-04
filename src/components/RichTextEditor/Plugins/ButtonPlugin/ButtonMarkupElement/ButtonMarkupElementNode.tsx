/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, ReactNode, useState } from 'react';
import { useRichTextEditorContext } from '@components/RichTextEditor/context/RichTextEditorContext';
import { ButtonRootProps } from '../components/Button';
import { ButtonStyle, TButtonElement } from '../types';
import { HTMLPropsAs, useElementProps } from '@udecode/plate';

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
        onMouseOver: (e: MouseEvent) => {
            e.stopPropagation();
        },
    };
};

export const ButtonMarkupElementNode = (props: ButtonRootProps) => {
    const { designTokens } = useRichTextEditorContext();
    const { href, target, buttonStyle } = useButton(props);
    const { attributes, children } = props;

    return (
        <HoverableButtonLink
            attributes={attributes}
            href={href}
            target={target}
            styles={getButtonStyle(designTokens, buttonStyle)}
        >
            {children}
        </HoverableButtonLink>
    );
};

const getButtonStyle = (designTokens: any, buttonStyle: ButtonStyle) => {
    switch (buttonStyle) {
        case 'primary':
            return designTokens.button_primary;
        case 'secondary':
            return designTokens.button_secondary;
        case 'tertiary':
            return designTokens.button_tertiary;
    }
};

type Props = {
    attributes: {
        'data-slate-node': 'element';
        'data-slate-inline'?: true | undefined;
        'data-slate-void'?: true | undefined;
        dir?: 'rtl' | undefined;
        ref: any;
    };
    styles: React.CSSProperties & { hover: React.CSSProperties };
    children: ReactNode;
    href?: string;
    target?: React.HTMLAttributeAnchorTarget | undefined;
};

const HoverableButtonLink: FC<Props> = ({ styles, children, href = '#', target }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <a
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            href={href}
            target={target}
            style={hovered ? { ...styles, ...styles.hover } : styles}
            className="hover:tw-cursor-pointer"
        >
            {children}
        </a>
    );
};
