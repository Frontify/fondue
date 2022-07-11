module.exports = {
    testMatch: ['**/?(*.)+(jesttest).[jt]s?(x)'],
    roots: ['<rootDir>/src'],
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts', '!src/mocks/**'],
    coveragePathIgnorePatterns: [],
    setupFilesAfterEnv: ['./config/jest/setupTests.js'],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|js|tsx|jsx)$': '@swc/jest',
        '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
        '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
    },
    transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
        '^.+\\.module\\.(css|sass|scss)$',
    ],
    modulePaths: ['<rootDir>/src'],
    moduleNameMapper: {
        '^react-native$': 'react-native-web',
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
        '^@components/(.*)$': '<rootDir>/src/components/$1',
        '^@foundation/(.*)$': '<rootDir>/src/foundation/$1',
        '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
        '^@layout/(.*)$': '<rootDir>/src/layout/$1',
        '^@typography/(.*)$': '<rootDir>/src/typography/$1',
        '^@utilities/(.*)$': '<rootDir>/src/utilities/$1',
    },
    moduleFileExtensions: [
        // Place tsx and ts to beginning as suggestion from Jest team
        // https://jestjs.io/docs/configuration#modulefileextensions-arraystring
        'tsx',
        'ts',
        'web.js',
        'js',
        'web.ts',
        'web.tsx',
        'json',
        'web.jsx',
        'jsx',
        'node',
    ],
    watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
    resetMocks: true,
};
