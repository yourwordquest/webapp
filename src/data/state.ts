import { createContext } from "react"
import { makeAutoObservable, runInAction } from "mobx"
import { uniqueId } from "utils/random"

interface FetchProps extends RequestInit {
    json?: any
    load?: boolean
    headers?: Headers
    method?: "GET" | "POST" | "DELETE" | "PUT"
    params?: Record<string, string>
    toastMessage?: boolean
    toastError?: boolean
    requestId?: string
}

interface ToastDefinition {
    type?: "error" | "warning" | "info" | "success"
    message: string
    autoHideDuration?: number
}

export class GlobalState {
    constructor() {
        makeAutoObservable(this)

        /* We use this channel to communicate changes across tabs. */
        this.channel = new BroadcastChannel("tab-sync")
        this.channel.addEventListener("message", this.receiveMessage.bind(this), true)
    }

    channel: BroadcastChannel

    toastMessages: Map<string, ToastDefinition> = new Map()

    private loadingItems: string[] = []

    get loading(): boolean {
        return this.loadingItems.length > 0
    }

    toast({ message, autoHideDuration = 6000, type = "info" }: ToastDefinition) {
        runInAction(() => {
            this.toastMessages.set(uniqueId(), {
                message,
                autoHideDuration,
                type,
            })
        })
    }

    private receiveMessage(event: MessageEvent<"logout">) {
        if (event.data === "logout") this.logout()
    }

    startLoading(item: string) {
        this.loadingItems.push(item)
    }

    stopLoading(item: string) {
        const position = this.loadingItems.indexOf(item)
        if (position >= 0) {
            this.loadingItems.splice(position, 1)
        }
    }

    isLoading(item: string): boolean {
        return this.loadingItems.includes(item)
    }

    promiseLoadingHelper(loadId?: string): () => void {
        // In most generic promises that we need to inform the user
        // Call this function as the final block.
        const processId = loadId ? loadId : new Date().getTime().toString(32)
        this.startLoading(processId)
        return () => {
            this.stopLoading(processId)
        }
    }

    logout(propagate?: boolean) {}

    async fetch<T = { success: boolean; message: string }>(
        path: string,
        props?: FetchProps
    ): Promise<{ response?: Response; data?: T }> {
        let headers = props?.headers
        let body = props?.body
        const method = props?.method ? props.method : "GET"
        const processId = new Date().getTime().toString(32)
        if (props?.load) this.startLoading(processId)

        if (props?.params) {
            const params = new URLSearchParams(props.params).toString()
            path = `${path}?${params}`
        }

        if (!headers) {
            headers = new Headers()
        }
        if (!body && props?.json) {
            body = JSON.stringify(props.json)
            headers.set("Content-Type", "application/json")
        }

        try {
            const response = await fetch(path, {
                mode: "cors",
                credentials: "include",
                headers,
                method,
                body,
            })

            if (response.status === 401) {
                this.logout(true)
            }

            if (props?.load) this.stopLoading(processId)
            let data = undefined
            if (response.headers.get("Content-Type") === "application/json") {
                data = await response.json()
            }
            if ((props?.toastMessage || props?.toastError) && data) {
                const { success, message } = data as {
                    success: boolean
                    message: string
                }
                if (props?.toastMessage) {
                    this.toast({ message, type: success ? "success" : "error" })
                } else if (props?.toastError && !success) {
                    this.toast({ message, type: "success" })
                }
            }
            return { response, data }
        } catch (err) {
            if (props?.load) this.stopLoading(processId)
            throw err
        }
    }
}

export const GlobalContext = createContext<GlobalState | null>(null)
