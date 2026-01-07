"use client"

import * as React from "react"
import { MockMarkContext, mergeTheme } from "./context"
import type { MockMarkConfig } from "./types"

interface MockMarkProviderProps extends MockMarkConfig {
    children: React.ReactNode
}

/**
 * Provider component for global MockMark configuration.
 * 
 * @example
 * ```tsx
 * <MockMarkProvider 
 *   enabled={process.env.NODE_ENV === 'development'}
 *   theme={{ borderColor: '#8b5cf6' }}
 *   tooltipTrigger="click"
 * >
 *   <App />
 * </MockMarkProvider>
 * ```
 */
export function MockMarkProvider({
    enabled = true,
    defaultVariant = "border",
    theme,
    tooltipTrigger = "hover",
    children,
}: MockMarkProviderProps) {
    const value = React.useMemo(
        () => ({
            enabled,
            defaultVariant,
            theme: mergeTheme(theme),
            tooltipTrigger,
        }),
        [enabled, defaultVariant, theme, tooltipTrigger]
    )

    return (
        <MockMarkContext.Provider value={value}>
            {children}
        </MockMarkContext.Provider>
    )
}
