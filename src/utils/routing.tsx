import React from "react"
import {
    Location,
    NavigateFunction,
    URLSearchParamsInit,
    useLocation,
    useNavigate,
    useParams,
    useSearchParams,
} from "react-router-dom"

export interface RoutedProps<Params = any, Search = any> {
    location: Location
    navigate: NavigateFunction
    params: Params
    search: Search
    setSearchParams: URLSearchParamsInit
}

export function withRouter<P extends RoutedProps>(Child: React.ComponentClass<P>) {
    return (props: Omit<P, keyof RoutedProps>) => {
        const location = useLocation()
        const navigate = useNavigate()
        const params = useParams()
        const search: Record<string, string> = {}
        const [search_params, setSearchParams] = useSearchParams()
        for (const [key, value] of search_params.entries()) {
            search[key] = value
        }
        return (
            <Child
                {...(props as P)}
                navigate={navigate}
                location={location}
                params={params}
                search={search}
                setSearchParams={setSearchParams}
            />
        )
    }
}

export function make_api_url(path: string): string {
    if (path.startsWith("https://") || path.startsWith("http://")) {
        return path
    }
    if (!path.startsWith("/")) {
        path = `/${path}`
    }
    let host = "https://api.yourword.quest"
    if (window.location.port === "3000") {
        host = `${window.location.protocol}//${window.location.hostname}:8000`
    }
    return `${host}${path}`
}
