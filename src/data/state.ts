import { createContext } from "react"
import { makeAutoObservable, runInAction } from "mobx"
import { Auth, getAuth, User } from "firebase/auth"
import { toNearest } from "utils/numbers"
import { make_api_url } from "utils/routing"
import { LocationRelations, Locations } from "./location"
import { AUTH_LOADING, LOCATION_LOADING } from "app_constants"
import { crisp } from "utils/crisp"
import { toast, TypeOptions } from "react-toastify"

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
    type?: TypeOptions
    message: string
    autoHideDuration?: number
}

export class GlobalState {
    constructor() {
        makeAutoObservable(this)

        this.auth = getAuth()

        this.auth.onAuthStateChanged((user) => {
            runInAction(() => {
                this.user = user
            })
            if (user) {
                crisp.setup_profile(user.displayName || "", user.email || "", user.photoURL || "")
            }
        })

        this.auth.onIdTokenChanged((use)=>{
            console.log(use)
        })

        this.appWidth = toNearest(window.innerWidth, 10)
        // Observe window resize
        window.addEventListener("resize", this.handleResize.bind(this))

        /* We use this channel to communicate changes across tabs. */
        this.channel = new BroadcastChannel("tab-sync")
        this.channel.addEventListener("message", this.receiveMessage.bind(this), true)
    }

    private auth: Auth
    user: User | null = null

    appWidth: number

    channel: BroadcastChannel

    authShowing: boolean = false
    locationPickerOpen: boolean = false

    locations?: Locations

    private loadingItems: string[] = []

    get loading(): boolean {
        return this.loadingItems.length > 0
    }

    get is_admin(): boolean {
        if(!this.user){
            return false
        }
        return Boolean(this.user.metadata)
    }

    toggleAuthView = () =>
        runInAction(() => {
            this.authShowing = !this.authShowing
        })

    toggleLocationPicker = () =>
        runInAction(() => {
            this.locationPickerOpen = !this.locationPickerOpen
        })

    toast({ message, autoHideDuration = 6000, type = "info" }: ToastDefinition) {
        toast(message, {
            type,
            position: "bottom-center",
            autoClose: autoHideDuration,
        })
    }

    private receiveMessage(event: MessageEvent<"logout">) {
        if (event.data === "logout") this.logout()
    }

    private handleResize(event: UIEvent) {
        // Use to nearest to avoid too many updates
        const width = toNearest(window.innerWidth, 10)
        if (width !== this.appWidth) {
            runInAction(() => {
                this.appWidth = width
            })
        }
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

    setLocation(locationId: string) {
        this.fetch<LocationRelations>(`/location/${locationId}/relations`)
            .then(({ data }) => {
                if (data) {
                    // Set the location and load details
                    runInAction(() => {
                        this.locations = new Locations(data)
                    })
                }
            })
            .finally(this.promiseLoadingHelper(LOCATION_LOADING))
    }

    logout(propagate?: boolean) {
        this.auth.signOut().finally(this.promiseLoadingHelper(AUTH_LOADING))
    }

    async fetch<T = { title: string }>(path: string, props?: FetchProps): Promise<{ response?: Response; data?: T }> {
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

        // Add auth
        if (this.user) {
            const token = await this.user.getIdToken()
            headers.set("Authorization", `Bearer ${token}`)
        }

        try {
            const response = await fetch(make_api_url(path), {
                mode: "cors",
                credentials: "omit",
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
                const success = response.ok
                const { title } = data as {
                    title: string
                }
                if (props?.toastMessage) {
                    this.toast({ message: title, type: success ? "success" : "error" })
                } else if (props?.toastError && !success) {
                    this.toast({ message: title, type: "error" })
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
