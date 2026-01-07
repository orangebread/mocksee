"use client"

import * as React from "react"
import { MockMarkContext, mergeTheme, defaultConfig } from "./context"
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
 * >
 *   <App />
 * </MockMarkProvider>
 * ```
 */
export function MockMarkProvider({
    enabled = true,
    defaultVariant = "border",
    theme,
    children,
}: MockMarkProviderProps) {
    const value = React.useMemo(
        () => ({
            enabled,
            defaultVariant,
            theme: mergeTheme(theme),
        }),
        [enabled, defaultVariant, theme]
    )

    return (
        <MockMarkContext.Provider value={value}>
            {children}
        </MockMarkContext.Provider>
    )
}
