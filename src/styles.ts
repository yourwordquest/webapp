import { primaryColor, secondaryColor } from "data/theme"
import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
    a {
        text-decoration: none;
        color: ${primaryColor};
        &:hover{
            color: ${secondaryColor};
        }
    }
`
