import { ThemeProvider } from "@frontify/fondue-tokens/themeProvider";
import { StoryFn } from "@storybook/react";
import React, { ComponentProps, ComponentType, ReactNode } from "react";

type withThemeOptions = {
    label?: string;
}

export const withTheme = (Story: ComponentType, theme: ComponentProps<typeof ThemeProvider>["theme"], options?: withThemeOptions) => {
    return (
        <ThemeProvider theme={theme}>
            <div style={{ padding: '2rem', backgroundColor: 'var(--base-color)', position: "relative" }}>
            {options?.label && <span style={{position: "absolute", top: "0.5rem", right: "0.5rem", color: "var(--text-color)"}}>{options.label}</span>}
                <Story />
            </div>
        </ThemeProvider>
    );
}
