import React from "react"
import { Home } from "components/home"
import { GlobalStyle } from "styles"
import { NavBar } from "components/navigation/navbar"
import { ThemeProvider } from "@fluentui/react"
import { FluentTheme } from "data/theme"

function App() {
    return (
        <ThemeProvider theme={FluentTheme}>
            <GlobalStyle />
            <NavBar />
            <Home />
        </ThemeProvider>
    )
}

export default App
