import React, { useContext, useEffect, useCallback, useState } from "react"
import {
    Location,
    NavigateFunction,
    URLSearchParamsInit,
    useLocation,
    useNavigate,
    useParams,
    useSearchParams,
    UNSAFE_NavigationContext as NavigationContext,
} from "react-router-dom"

export interface RoutedProps<Params = any, Search = any> {
    location: Location
    navigate: NavigateFunction
    params: Params
    search: Search
    setSearchParams: URLSearchParamsInit
    setPrompt: (prompt: string) => void
}

export function withRouter<P extends RoutedProps>(Child: React.ComponentClass<P>) {
    return (props: Omit<P, keyof RoutedProps>) => {
        const location = useLocation()
        const navigate = useNavigate()
        const [prompt, setPrompt] = useState(null)
        const params = useParams()
        const search: Record<string, string> = {}
        const [search_params, setSearchParams] = useSearchParams()
        for (const [key, value] of search_params.entries()) {
            search[key] = value
        }

        usePrompt(String(prompt), Boolean(prompt))

        return (
            <Child
                {...(props as P)}
                navigate={navigate}
                location={location}
                params={params}
                search={search}
                setSearchParams={setSearchParams}
                setPrompt={setPrompt}
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

// a little hack borrowed from https://gist.github.com/rmorse/426ffcc579922a82749934826fa9f743
function useBlocker(blocker: any, when: boolean = true) {
    const ctx: any = useContext(NavigationContext)

    useEffect(() => {
        if (!when) return

        const unblock = ctx.navigator.block((tx: any) => {
            const autoUnblockingTx = {
                ...tx,
                retry() {
                    // Automatically unblock the transition so it can play all the way
                    // through before retrying it. TODO: Figure out how to re-enable
                    // this block if the transition is cancelled for some reason.
                    unblock()
                    tx.retry()
                },
            }

            blocker(autoUnblockingTx)
        })

        return unblock
    }, [ctx.navigator, blocker, when])
}

// a little hack borrowed from https://gist.github.com/rmorse/426ffcc579922a82749934826fa9f743
function usePrompt(message: string, when: boolean = true) {
    const blocker = useCallback(
        (tx) => {
            // eslint-disable-next-line no-alert
            if (window.confirm(message)) tx.retry()
        },
        [message]
    )

    useBlocker(blocker, when)
}
