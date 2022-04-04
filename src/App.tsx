import React from "react"
import { BrowserRouter } from "react-router-dom"
import { Home } from "components/home"
import { GlobalStyle } from "styles"
import { NavBar } from "components/navigation/navbar"
import { ThemeProvider } from "@fluentui/react"
import { FluentTheme } from "data/theme"
import { GlobalContext, GlobalState } from "data/state"

function App() {
    const sharedState = new GlobalState()
    return (
        <BrowserRouter>
            <GlobalContext.Provider value={sharedState}>
                <ThemeProvider theme={FluentTheme}>
                    <GlobalStyle />
                    <NavBar />
                    <Home />
                </ThemeProvider>
            </GlobalContext.Provider>
        </BrowserRouter>
    )
}

export default App
