"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, nonce, ...props }: Readonly<ThemeProviderProps & { nonce?: string }>) {
    return <NextThemesProvider {...props} nonce={nonce}>{children}</NextThemesProvider>
}