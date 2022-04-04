import { primaryColor, secondaryColor, TextFonts } from "data/theme"
import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
    font-family: ${TextFonts};
    a {
        text-decoration: none;
        color: ${primaryColor};
        &:hover{
            color: ${secondaryColor};
        }
    }
`
