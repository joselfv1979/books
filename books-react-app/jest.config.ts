import type { Config } from "@jest/types";
// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    transform: {
        "^.+\\.(ts|tsx)?$": "ts-jest",
    },
    testEnvironment: "jsdom",
    moduleNameMapper: {
        // if your using tsconfig.paths thers is no harm in telling jest
        // "@components/(.*)$": "<rootDir>/src/components/$1",
        // "@/(.*)$": "<rootDir>/src/$1",

        // mocking assests and styling
        "^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/src/tests/mocks/fileMock.ts",
        "^.+\\.(css|less|scss|sass)$": "<rootDir>/src/tests/mocks/styleMock.ts",
        /* mock models and services folder */
        // "(assets|models|services)": "<rootDir>/tests/mocks/fileMock.ts",
    },
    setupFilesAfterEnv: ["./src/tests/setupTests.ts"],
};
export default config;