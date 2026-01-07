import * as React from "react"

/**
 * Visual style variants for MockMark
 */
export type MockMarkVariant = "border" | "badge" | "minimal"

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
}

/**
 * Props for the MockMark component
 */
export interface MockMarkProps {
    /** Label displayed on the indicator badge */
    label?: string
    /** Reason/description shown on hover (tooltip) */
    reason?: string
    /** Alias for reason - description shown on hover */
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
 * Context value type
 */
export type MockMarkContextValue = Required<MockMarkConfig>
