/** @type {import('ts-jest').JestConfigWithTsJest} */
// eslint-disable-next-line no-undef
module.exports = {
    collectCoverageFrom: ["src/**/*.ts", "!**/node_modules/**"],
    coverageReporters: ["html", "text", "text-summary", "cobertura"],
    coverageThreshold: {
        global: {
            statements: 60,
            branches: 50,
            functions: 60,
            lines: 60,
        },
    },
    coveragePathIgnorePatterns: [
        "./src/scripts/*",
    ],
    forceExit: true,
    injectGlobals: true,
    preset: "ts-jest",
    randomize: true,
    reporters: ["default", "jest-junit"],
    roots: ["./src"],
    testEnvironment: "node",
    testMatch: ["**/*.test.ts"],
    modulePathIgnorePatterns: ["<rootDir>/deprecated/"],
    verbose: true,
};
