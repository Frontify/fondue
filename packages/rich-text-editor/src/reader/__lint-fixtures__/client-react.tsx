/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text-output/AC-049: the reader imports no hook, context or class component from React; `createElement`,
// `Fragment` and the types stay allowed.
// expect-lint: eslint(no-restricted-imports)
import { Component, createContext, createElement, Fragment, type ReactNode, useContext, useState } from 'react';

export const used: readonly unknown[] = [Component, createContext, createElement, Fragment, useContext, useState];
export type Child = ReactNode;
