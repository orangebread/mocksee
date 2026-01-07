import * as React from "react"

/**
 * Visual style variants for MockMark
 */
export type MockMarkVariant = "border" | "badge" | "minimal"

/**
 * Tooltip trigger mode - hover shows on hover anywhere, click only triggers on label click
 */
export type TooltipTrigger = "hover" | "click"

/**
 * Theme configuration for MockMark styling
 */
export interface MockMarkTheme {
    /** Border color for the indicator */
    borderColor?: string
    /** Background color for the label badge */
    labelBg?: string
    /** Text color for the label */
    labelColor?: string
    /** Font size for the label */
    labelFontSize?: string
    /** Background color for the tooltip */
    tooltipBg?: string
    /** Text color for the tooltip */
    tooltipColor?: string
    /** Font size for the tooltip text */
    tooltipFontSize?: string
}

/**
 * Global configuration for MockMark provider
 */
export interface MockMarkConfig {
    /** Whether MockMark indicators are enabled (default: true in development) */
    enabled?: boolean
    /** Default visual variant */
    defaultVariant?: MockMarkVariant
    /** Theme customization */
    theme?: MockMarkTheme
    /** How to trigger tooltip: "hover" (default) or "click" (click only applies to label) */
    tooltipTrigger?: TooltipTrigger
}

/**
 * Props for the MockMark component
 */
export interface MockMarkProps {
    /** Label displayed on the indicator badge */
    label?: string
    /** Reason/description shown in tooltip */
    reason?: string
    /** Alias for reason - description shown in tooltip */
    description?: string
    /** Visual style variant */
    variant?: MockMarkVariant
    /** Force disable this specific indicator */
    disabled?: boolean
    /** Children to wrap */
    children: React.ReactNode
    /** Additional CSS class name */
    className?: string
    /** Additional inline styles */
    style?: React.CSSProperties
}

/**
 * Context value type with required fields + defaults
 */
export interface MockMarkContextValue {
    enabled: boolean
    defaultVariant: MockMarkVariant
    theme: Required<MockMarkTheme>
    tooltipTrigger: TooltipTrigger
}

