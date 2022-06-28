import { createContext } from 'react';
import { DesignTokens } from '../types';
import { defaultDesignTokens } from '../utils/defaultDesignTokens';

export const DesignTokensContext = createContext<{ designTokens: DesignTokens }>({ designTokens: defaultDesignTokens });
