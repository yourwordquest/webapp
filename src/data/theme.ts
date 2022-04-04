import { createTheme } from "@fluentui/react"

export const NavBarHeight = 60
export const SideBarWidth = 100

export const primaryColor = "#03A9F4"
export const secondaryColor = "#546E7A"

export const promiseColors = {
    delivered: "#00c853",
    inProgress: "#aeea00",
    pending: "#ffc107",
    broken: "#b71c1c",
}

export const TextFonts =
    "'Roboto', 'Segoe UI', 'Segoe UI Web (West European)', 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif"
const TitleFonts =
    "'Lora', 'Segoe UI', 'Segoe UI Web (West European)', 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif"

// Partly generated with
// https://fluentuipr.z22.web.core.windows.net/heads/master/theming-designer/index.html
export const FluentTheme = createTheme({
    palette: {
        themePrimary: "#0099ff",
        themeLighterAlt: "#f5fbff",
        themeLighter: "#d6efff",
        themeLight: "#b3e0ff",
        themeTertiary: "#66c2ff",
        themeSecondary: "#1fa5ff",
        themeDarkAlt: "#008ae6",
        themeDark: "#0074c2",
        themeDarker: "#00568f",
        neutralLighterAlt: "#faf9f8",
        neutralLighter: "#f3f2f1",
        neutralLight: "#edebe9",
        neutralQuaternaryAlt: "#e1dfdd",
        neutralQuaternary: "#d0d0d0",
        neutralTertiaryAlt: "#c8c6c4",
        neutralTertiary: "#c7c7c7",
        neutralSecondary: "#8f8f8f",
        neutralPrimaryAlt: "#5b5b5b",
        neutralPrimary: "#444444",
        neutralDark: "#343434",
        black: "#272727",
        white: "#ffffff",
    },
    fonts: {
        tiny: { fontFamily: TextFonts },
        small: { fontFamily: TextFonts },
        xSmall: { fontFamily: TextFonts },
        smallPlus: { fontFamily: TextFonts },
        medium: { fontFamily: TextFonts },
        mediumPlus: { fontFamily: TextFonts },
        large: { fontFamily: TextFonts },
        xLarge: { fontFamily: TitleFonts },
        xxLarge: { fontFamily: TitleFonts },
        xxLargePlus: { fontFamily: TitleFonts },
        superLarge: { fontFamily: TitleFonts },
        mega: { fontFamily: TitleFonts },
    },
})
