/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-check

import frontifyConfig from '@frontify/eslint-config-react';
import noticePlugin from 'eslint-plugin-notice';
import tailwindcssPlugin from 'eslint-plugin-tailwindcss';
import tseslint from 'typescript-eslint';
import storybookPlugin from 'eslint-plugin-storybook';

export default tseslint.config(
    {
        ignores: [
            'dist/',
            'coverage/',
            'storybook-static/',
            'playwright-report/',
            'test-results/',
            'playwright/',
            'node_modules/',
            'debug-storybook.log',
            '.storybook/**',
            'MIGRATING.md',
            'postcss.config.cjs',
            'eslint.config.mjs',
        ],
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    frontifyConfig,
    {
        files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
        languageOptions: {
            parserOptions: {
                project: ['./tsconfig.json'],
            },
        },
        plugins: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            notice: noticePlugin,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            tailwindcss: tailwindcssPlugin,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            storybook: storybookPlugin,
        },
        rules: {
            // Copyright header rules=
            'notice/notice': [
                'error',
                {
                    template: '/* (c) Copyright Frontify Ltd., all rights reserved. */\n\n',
                    messages: {
                        whenFailedToMatch: 'No Frontify copyright header set.',
                    },
                },
            ],

            // TailwindCSS rules
            'tailwindcss/no-custom-classname': [
                'warn',
                {
                    whitelist: ['^(?!tw-).*$'],
                    callees: ['className', 'sv', 'class'],
                },
            ],
            'tailwindcss/no-contradicting-classname': 'error',
            'tailwindcss/enforces-negative-arbitrary-values': 'error',
            'tailwindcss/no-unnecessary-arbitrary-value': 'error',

            // JavaScript DOM rules
            'unicorn/prefer-dom-node-text-content': 'warn',

            // React rules
            '@eslint-react/dom/no-missing-button-type': 'warn',

            // Typescript rules
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-floating-promises': 'warn',
            '@typescript-eslint/no-misused-promises': 'warn',
            '@typescript-eslint/no-unsafe-argument': 'warn',
            '@typescript-eslint/no-unsafe-assignment': 'warn',
            '@typescript-eslint/no-unsafe-call': 'warn',
            '@typescript-eslint/no-unsafe-member-access': 'warn',
            '@typescript-eslint/no-unsafe-return': 'warn',
            '@typescript-eslint/prefer-promise-reject-errors': 'warn',
            'promise/always-return': 'warn',
            'promise/catch-or-return': 'warn',
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
        ignores: [
            '**/*.spec.tsx',
            '**/*.spec.ts',
            '**/*.stories.tsx',
            'src/helpers/Store/Storage/LocalStorageStorage.ts',
            'application/client/Utility/StorageHandler/SimpleStorageHandler.ts',
            'application/client/Utility/StorageHandler/GroupStorageHandler.ts',
        ],
        rules: {
            'no-restricted-syntax': [
                'error',
                {
                    selector: "CallExpression[callee.object.name='localStorage']",
                    message: 'Do not use `localStorage` directly, use the `Store` with `LocalStorageStorage` instead',
                },
                {
                    selector:
                        "CallExpression[callee.object.object.name='window'][callee.object.property.name='localStorage']",
                    message: 'Do not use `localStorage` directly, use the `Store` with `LocalStorageStorage` instead',
                },
            ],
        },
    },
    {
        files: ['**/*.stories.tsx'],
        rules: {
            'react-hooks/rules-of-hooks': 'off',
            '@eslint-react/hooks-extra/prefer-use-state-lazy-initialization': 'off',
            '@eslint-community/eslint-comments/disable-enable-pair': 'off',
        },
    },
    {
        files: ['application/**/*.ts', 'application/**/*.tsx'],
        ignores: [
            'application/client/Utility/I18n/I18n.ts',
            'application/addons/bootstrap.tsx',
            'application/App.tsx',
            'application/client/Providers.tsx',
        ],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    paths: [
                        {
                            name: 'react-i18next',
                            importNames: ['default', 'getI18n', 'setI18n', 'I18nContext', 'initReactI18next'],
                            message:
                                'If you are in a React component: use the `useTranslation`.\nIf you are in a helper: create a `t` parameter to the function and pass it from its parent.\nIf you are in a `Tc.Module` use the `window.translate`.\nIf not possible, please reach out to the `#frontend-platform`.',
                        },
                        {
                            name: 'i18next',
                            message:
                                'If you are in a React component: use the `useTranslation`.\nIf you are in a helper: create a `t` parameter to the function and pass it from its parent.\nIf you are in a `Tc.Module` use the `window.translate`.\nIf not possible, please reach out to the `#frontend-platform`.',
                        },
                        {
                            name: 'Client/Utility/I18n/I18n',
                            message:
                                'If you are in a React component: use the `useTranslation`.\nIf you are in a helper: create a `t` parameter to the function and pass it from its parent.\nIf you are in a `Tc.Module` use the `window.translate`.\nIf not possible, please reach out to the `#frontend-platform`.',
                        },
                        {
                            name: 'Utility/I18n/I18n',
                            message:
                                'If you are in a React component: use the `useTranslation`.\nIf you are in a helper: create a `t` parameter to the function and pass it from its parent.\nIf you are in a `Tc.Module` use the `window.translate`.\nIf not possible, please reach out to the `#frontend-platform`.',
                        },
                    ],
                },
            ],
        },
    },
    {
        files: ['.github/**/*.yaml', '.github/**/*.yml'],
        rules: {
            'yml/no-empty-mapping-value': 'off',
        },
    },
);
