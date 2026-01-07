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
    const tooltipText = reason ?? description
    const [tooltipVisible, setTooltipVisible] = React.useState(false)

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
        userSelect: "none" as const,
        fontFamily: "system-ui, -apple-system, sans-serif",
        lineHeight: 1.2,
        // Make clickable when in click mode
        cursor: config.tooltipTrigger === "click" && tooltipText ? "pointer" : "default",
        pointerEvents: config.tooltipTrigger === "click" ? "auto" : "none",
    }

    const tooltipStyle: React.CSSProperties = {
        position: "absolute",
        top: "100%",
        left: resolvedVariant === "minimal" ? "0" : "8px",
        marginTop: "6px",
        backgroundColor: theme.tooltipBg,
        color: theme.tooltipColor,
        fontSize: theme.tooltipFontSize,
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "8px 12px",
        borderRadius: "6px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        whiteSpace: "nowrap",
        zIndex: 100,
        opacity: tooltipVisible ? 1 : 0,
        visibility: tooltipVisible ? "visible" : "hidden",
        transform: tooltipVisible ? "translateY(0)" : "translateY(-4px)",
        transition: "opacity 150ms ease, transform 150ms ease, visibility 150ms",
        pointerEvents: "none" as const,
        maxWidth: "280px",
        lineHeight: 1.4,
    }

    // Tooltip arrow
    const arrowStyle: React.CSSProperties = {
        position: "absolute",
        top: "-4px",
        left: "12px",
        width: "8px",
        height: "8px",
        backgroundColor: theme.tooltipBg,
        transform: "rotate(45deg)",
        borderTopLeftRadius: "2px",
    }

    const handleLabelClick = (e: React.MouseEvent) => {
        if (config.tooltipTrigger === "click" && tooltipText) {
            e.stopPropagation()
            setTooltipVisible(!tooltipVisible)
        }
    }

    // For hover mode, handle mouse events on the entire container
    const containerHoverHandlers = config.tooltipTrigger === "hover" && tooltipText
        ? {
            onMouseEnter: () => setTooltipVisible(true),
            onMouseLeave: () => setTooltipVisible(false),
        }
        : {}

    // Close tooltip when clicking outside (for click mode)
    React.useEffect(() => {
        if (config.tooltipTrigger === "click" && tooltipVisible) {
            const handleClickOutside = () => setTooltipVisible(false)
            // Delay to prevent immediate close on the same click
            const timer = setTimeout(() => {
                document.addEventListener("click", handleClickOutside)
            }, 0)
            return () => {
                clearTimeout(timer)
                document.removeEventListener("click", handleClickOutside)
            }
        }
    }, [config.tooltipTrigger, tooltipVisible])

    return (
        <div
            className={className}
            style={getContainerStyle()}
            {...containerHoverHandlers}
        >
            <div
                style={labelStyle}
                onClick={handleLabelClick}
                role={config.tooltipTrigger === "click" && tooltipText ? "button" : undefined}
                tabIndex={config.tooltipTrigger === "click" && tooltipText ? 0 : undefined}
                onKeyDown={(e) => {
                    if (config.tooltipTrigger === "click" && tooltipText && (e.key === "Enter" || e.key === " ")) {
                        e.preventDefault()
                        setTooltipVisible(!tooltipVisible)
                    }
                }}
            >
                {label}
            </div>
            {/* Custom tooltip */}
            {tooltipText && (
                <div style={tooltipStyle} role="tooltip" aria-hidden={!tooltipVisible}>
                    <div style={arrowStyle} />
                    {tooltipText}
                </div>
            )}
            {children}
        </div>
    )
}
