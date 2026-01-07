"use client"

import * as React from "react"
import type { MockMarkContextValue, MockMarkTheme } from "./types"

const defaultTheme: Required<MockMarkTheme> = {
    borderColor: "#f97316",
    labelBg: "#f97316",
    labelColor: "#ffffff",
    labelFontSize: "10px",
    tooltipBg: "rgba(15, 23, 42, 0.95)",
    tooltipColor: "#ffffff",
    tooltipFontSize: "12px",
}

const defaultConfig: MockMarkContextValue = {
    enabled: true,
    defaultVariant: "border",
    theme: defaultTheme,
    tooltipTrigger: "hover",
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
