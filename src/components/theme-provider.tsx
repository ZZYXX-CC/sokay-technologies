"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <NextThemesProvider 
      forcedTheme="dark" 
      enableSystem={false} 
      disableTransitionOnChange 
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
