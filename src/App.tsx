import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Home } from "components/home"
import { GlobalStyle } from "styles"
import { NavBar } from "components/navigation/navbar"
import { ThemeProvider } from "@fluentui/react"
import { FluentTheme } from "data/theme"
import { GlobalContext, GlobalState } from "data/state"
import { AuthDialog } from "components/auth/login"
import { Contributions } from "components/contributions"
import { ContributionComponent } from "components/contributions/contribution"
import { PromiseView } from "components/promises"

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
                        <Route path="/contribute/:id" element={<ContributionComponent />} />
                        <Route path="/promises/:type/:id" element={<PromiseView />} />
                    </Routes>
                    <ToastContainer />
                </ThemeProvider>
            </GlobalContext.Provider>
        </BrowserRouter>
    )
}

export default App
