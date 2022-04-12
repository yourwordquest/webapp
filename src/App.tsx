import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "components/home"
import { GlobalStyle } from "styles"
import { NavBar } from "components/navigation/navbar"
import { ThemeProvider } from "@fluentui/react"
import { FluentTheme } from "data/theme"
import { GlobalContext, GlobalState } from "data/state"
import { AuthDialog } from "components/auth/login"
import { Contributions } from "components/contributions"

function App() {
    const sharedState = new GlobalState()
    return (
        <BrowserRouter>
            <GlobalContext.Provider value={sharedState}>
                <ThemeProvider theme={FluentTheme}>
                    <GlobalStyle />
                    <NavBar />
                    <AuthDialog />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/contribute" element={<Contributions />} />
                    </Routes>
                </ThemeProvider>
            </GlobalContext.Provider>
        </BrowserRouter>
    )
}

export default App
