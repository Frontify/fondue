/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactNode } from 'react';
import { MentionElementProps, Value } from '@udecode/plate';
import { MentionableCategory } from '../types';

export type MarkupElementProps = { children: ReactNode } & MentionElementProps<Value>;
export type MarkupElementNodeType = ({ children, ...props }: MarkupElementProps) => JSX.Element;

export type MarkupElementNodeComponentProps = { category: MentionableCategory } & MarkupElementProps;
export type MarkupElementNodeComponentType = ({
    category,
    children,
    ...props
}: MarkupElementNodeComponentProps) => JSX.Element;
