/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PlateRenderElementProps } from '@udecode/plate-core';
import { type ReactElement } from 'react';

import { type MentionableCategory } from '../types';

export type MarkupElementProps = PlateRenderElementProps;
export type MarkupElementNodeType = ({ children, ...props }: MarkupElementProps) => ReactElement;

export type MarkupElementNodeComponentProps = { category: MentionableCategory } & MarkupElementProps;
export type MarkupElementNodeComponentType = ({
    category,
    children,
    ...props
}: MarkupElementNodeComponentProps) => ReactElement;
