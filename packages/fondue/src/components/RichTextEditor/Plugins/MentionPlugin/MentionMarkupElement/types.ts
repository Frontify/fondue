/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
import { PlateRenderElementProps } from '@udecode/plate';
import { MentionableCategory } from '../types';

export type MarkupElementProps = PlateRenderElementProps;
export type MarkupElementNodeType = ({ children, ...props }: MarkupElementProps) => ReactElement;

export type MarkupElementNodeComponentProps = { category: MentionableCategory } & MarkupElementProps;
export type MarkupElementNodeComponentType = ({
    category,
    children,
    ...props
}: MarkupElementNodeComponentProps) => ReactElement;
