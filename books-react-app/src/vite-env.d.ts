/// <reference types="vite/client" />

import type { TestingLibraryMatchers } from "@testing-library/jest-dom/types/matchers";
import "vitest";

declare module "vitest" {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    interface Assertion<T = any> extends TestingLibraryMatchers<T, void> { }
}