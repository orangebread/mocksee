"use client"

import * as React from "react"
import type { MockMarkContextValue, MockMarkTheme, MockMarkVariant } from "./types"

const defaultTheme: Required<MockMarkTheme> = {
    borderColor: "#f97316",
    labelBg: "#f97316",
    labelColor: "#ffffff",
    labelFontSize: "10px",
}

const defaultConfig: MockMarkContextValue = {
    enabled: true,
    defaultVariant: "border",
    theme: defaultTheme,
}

export const MockMarkContext = React.createContext<MockMarkContextValue>(defaultConfig)

/**
 * Hook to access MockMark configuration
 */
export function useMockMark(): MockMarkContextValue {
    return React.useContext(MockMarkContext)
}

/**
 * Merge theme with defaults
 */
export function mergeTheme(theme?: Partial<MockMarkTheme>): Required<MockMarkTheme> {
    return { ...defaultTheme, ...theme }
}

export { defaultConfig, defaultTheme }
