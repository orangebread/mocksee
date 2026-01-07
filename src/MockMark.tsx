"use client"

import * as React from "react"
import { useMockMark, mergeTheme } from "./context"
import type { MockMarkProps } from "./types"

/**
 * Development-only visual indicator for components using mock data.
 * 
 * Wraps children with a visual indicator (border, badge, or minimal)
 * to highlight that the content is using mock/placeholder data.
 * 
 * In production, this component is a no-op and returns children directly
 * when the provider's `enabled` prop is false.
 * 
 * @example
 * ```tsx
 * <MockMark label="API Data" reason="Not connected to backend">
 *   <UserList users={mockUsers} />
 * </MockMark>
 * ```
 */
export function MockMark({
    label = "MOCK",
    reason,
    description,
    variant,
    disabled = false,
    children,
    className,
    style,
}: MockMarkProps) {
    const config = useMockMark()
    const resolvedVariant = variant ?? config.defaultVariant
    const theme = mergeTheme(config.theme)
    const tooltip = reason ?? description

    // Early return if disabled globally or locally
    if (!config.enabled || disabled) {
        return <>{children}</>
    }

    // Styles based on variant
    const getContainerStyle = (): React.CSSProperties => {
        const base: React.CSSProperties = {
            position: "relative",
            ...style,
        }

        switch (resolvedVariant) {
            case "border":
                return {
                    ...base,
                    border: `2px dashed ${theme.borderColor}`,
                    borderRadius: "8px",
                    padding: "4px",
                }
            case "badge":
                return base
            case "minimal":
                return {
                    ...base,
                    outline: `1px dashed ${theme.borderColor}`,
                    outlineOffset: "-1px",
                }
            default:
                return base
        }
    }

    const labelStyle: React.CSSProperties = {
        position: "absolute",
        top: resolvedVariant === "minimal" ? "0" : "-10px",
        left: resolvedVariant === "minimal" ? "0" : "8px",
        backgroundColor: theme.labelBg,
        color: theme.labelColor,
        fontSize: theme.labelFontSize,
        fontWeight: 600,
        padding: resolvedVariant === "minimal" ? "1px 4px" : "2px 6px",
        borderRadius: resolvedVariant === "minimal" ? "0 0 4px 0" : "4px",
        textTransform: "uppercase" as const,
        letterSpacing: "0.05em",
        zIndex: 50,
        pointerEvents: "none" as const,
        userSelect: "none" as const,
        fontFamily: "system-ui, -apple-system, sans-serif",
        lineHeight: 1.2,
    }

    return (
        <div className={className} style={getContainerStyle()} title={tooltip}>
            <div style={labelStyle}>{label}</div>
            {children}
        </div>
    )
}
