import React from "react"
import { Location, NavigateFunction, useLocation, useNavigate, useParams } from "react-router-dom"

export interface RoutedProps<Params = any, Search = any> {
    location: Location
    navigate: NavigateFunction
    params: Params
    search: Search
}

export function withRouter<P extends RoutedProps>(Child: React.ComponentClass<P>) {
    return (props: Omit<P, keyof RoutedProps>) => {
        const location = useLocation()
        const navigate = useNavigate()
        const params = useParams()
        const search: Record<string, string> = {}
        const search_params = new URLSearchParams(location.search)
        for (const [key, value] of search_params.entries()) {
            search[key] = value
        }
        return <Child {...(props as P)} navigate={navigate} location={location} params={params} search={search} />
    }
}
