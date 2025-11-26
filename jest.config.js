const { createDefaultPreset } = require('ts-jest');

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import('jest').Config} **/
module.exports = {
    testEnvironment: 'node',
    testMatch: [
        '<rootDir>/tests/**/*.test.ts'
    ],
    moduleFileExtensions: ['ts', 'js', 'json'],
    transform: {
        ...tsJestTransformCfg,
    },
};
